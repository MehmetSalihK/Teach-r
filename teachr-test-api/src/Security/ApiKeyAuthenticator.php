<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class ApiKeyAuthenticator extends AbstractAuthenticator
{
    public function supports(Request $request): ?bool
    {
        // Ne pas authentifier les routes publiques
        if (str_starts_with($request->getPathInfo(), '/api/login') ||
            str_starts_with($request->getPathInfo(), '/api/register') ||
            str_starts_with($request->getPathInfo(), '/api/forgot-password') ||
            str_starts_with($request->getPathInfo(), '/api/reset-password')) {
            return false;
        }

        return true;
    }

    public function authenticate(Request $request): Passport
    {
        $apiToken = $request->headers->get('Authorization');
        if (null === $apiToken) {
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }

        // Retirer le préfixe "Bearer " si présent
        $apiToken = str_replace('Bearer ', '', $apiToken);

        return new SelfValidatingPassport(new UserBadge($apiToken));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}
