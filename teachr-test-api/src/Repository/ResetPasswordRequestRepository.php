<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\ResetPasswordRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ResetPasswordRequest>
 */
class ResetPasswordRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResetPasswordRequest::class);
    }

    public function createResetPasswordRequest(User $user): ResetPasswordRequest
    {
        // Supprimer les anciennes demandes pour cet utilisateur
        $this->createQueryBuilder('r')
            ->delete()
            ->where('r.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->execute();

        // Créer une nouvelle demande
        $resetRequest = new ResetPasswordRequest();
        $resetRequest->setUser($user);
        $resetRequest->setToken(bin2hex(random_bytes(32)));
        $resetRequest->setExpiresAt(new \DateTimeImmutable('+1 hour'));

        $this->getEntityManager()->persist($resetRequest);
        $this->getEntityManager()->flush();

        return $resetRequest;
    }

    public function findValidToken(string $token): ?ResetPasswordRequest
    {
        return $this->createQueryBuilder('r')
            ->where('r.token = :token')
            ->andWhere('r.expiresAt > :now')
            ->setParameter('token', $token)
            ->setParameter('now', new \DateTimeImmutable())
            ->getQuery()
            ->getOneOrNullResult();
    }
}
