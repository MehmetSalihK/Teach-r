<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class SecurityController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private ValidatorInterface $validator
    ) {
    }

    #[Route('/login', name: 'app_login', methods: ['GET', 'POST'])]
    public function login(Request $request): JsonResponse
    {
        if ($request->isMethod('GET')) {
            return new JsonResponse([
                'message' => 'Documentation de l\'endpoint de connexion',
                'method' => 'POST',
                'content-type' => 'application/json',
                'body' => [
                    'email' => 'string (required)',
                    'password' => 'string (required)'
                ],
                'responses' => [
                    '200' => [
                        'token' => 'string',
                        'user' => [
                            'id' => 'integer',
                            'email' => 'string',
                            'roles' => 'array'
                        ]
                    ],
                    '400' => [
                        'message' => 'Email et mot de passe requis'
                    ],
                    '401' => [
                        'message' => 'Email ou mot de passe incorrect'
                    ]
                ]
            ]);
        }

        try {
            $content = json_decode($request->getContent(), true);
            
            if (!isset($content['email']) || !isset($content['password'])) {
                return new JsonResponse([
                    'message' => 'Email et mot de passe requis'
                ], Response::HTTP_BAD_REQUEST);
            }

            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $content['email']]);
            
            if (!$user || !$this->passwordHasher->isPasswordValid($user, $content['password'])) {
                return new JsonResponse([
                    'message' => 'Email ou mot de passe incorrect'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Générer un token simple (à remplacer par JWT plus tard)
            $token = bin2hex(random_bytes(32));

            return new JsonResponse([
                'token' => $token,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles()
                ]
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de la connexion',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/register', name: 'app_register', methods: ['GET', 'POST'])]
    public function register(Request $request): JsonResponse
    {
        if ($request->isMethod('GET')) {
            return new JsonResponse([
                'message' => 'Documentation de l\'endpoint d\'inscription',
                'method' => 'POST',
                'content-type' => 'application/json',
                'body' => [
                    'email' => 'string (required)',
                    'password' => 'string (required)'
                ],
                'responses' => [
                    '201' => [
                        'token' => 'string',
                        'user' => [
                            'id' => 'integer',
                            'email' => 'string',
                            'roles' => 'array'
                        ]
                    ],
                    '400' => [
                        'message' => 'Email et mot de passe requis'
                    ],
                    '409' => [
                        'message' => 'Un compte existe déjà avec cet email'
                    ]
                ]
            ]);
        }

        try {
            $content = json_decode($request->getContent(), true);
            
            if (!isset($content['email']) || !isset($content['password'])) {
                return new JsonResponse([
                    'message' => 'Email et mot de passe requis'
                ], Response::HTTP_BAD_REQUEST);
            }

            $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $content['email']]);
            if ($existingUser) {
                return new JsonResponse([
                    'message' => 'Un compte existe déjà avec cet email'
                ], Response::HTTP_CONFLICT);
            }

            $user = new User();
            $user->setEmail($content['email']);
            $hashedPassword = $this->passwordHasher->hashPassword($user, $content['password']);
            $user->setPassword($hashedPassword);
            $user->setRoles(['ROLE_USER']);

            $errors = $this->validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return new JsonResponse(['message' => implode(', ', $errorMessages)], Response::HTTP_BAD_REQUEST);
            }

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Générer un token simple (à remplacer par JWT plus tard)
            $token = bin2hex(random_bytes(32));

            return new JsonResponse([
                'token' => $token,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles()
                ]
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Déconnexion réussie'
        ]);
    }
}
