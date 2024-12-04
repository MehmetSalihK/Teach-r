<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/categories')]
class CategoryController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private CategoryRepository $categoryRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {
    }

    #[Route('', name: 'category_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $categories = $this->categoryRepository->findAll();
        $data = $this->serializer->serialize($categories, 'json', ['groups' => 'category:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'category_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);
        
        if (!$category) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $this->serializer->serialize($category, 'json', ['groups' => 'category:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('', name: 'category_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $category = new Category();
        $category->setName($data['name']);
        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }

        $errors = $this->validator->validate($category);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return new JsonResponse(['message' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        $data = $this->serializer->serialize($category, 'json', ['groups' => 'category:read']);
        return new JsonResponse($data, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'category_update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);
        
        if (!$category) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        
        if (isset($data['name'])) {
            $category->setName($data['name']);
        }
        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }

        $errors = $this->validator->validate($category);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return new JsonResponse(['message' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->flush();

        $data = $this->serializer->serialize($category, 'json', ['groups' => 'category:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'category_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);
        
        if (!$category) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($category);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
