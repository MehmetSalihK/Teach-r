<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProductRepository $productRepository,
        private CategoryRepository $categoryRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {
    }

    #[Route('', name: 'product_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        // Pagination parameters
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
        
        // Search parameter
        $search = $request->query->get('search');
        
        // Category filter
        $categoryId = $request->query->get('category');
        
        // Sort parameters
        $sortField = $request->query->get('sort', 'name');
        $sortOrder = $request->query->get('order', 'asc');

        $queryBuilder = $this->productRepository->createQueryBuilder('p');

        // Apply search filter
        if ($search) {
            $queryBuilder
                ->andWhere('p.name LIKE :search OR p.description LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }

        // Apply category filter
        if ($categoryId) {
            $queryBuilder
                ->andWhere('p.category = :categoryId')
                ->setParameter('categoryId', $categoryId);
        }

        // Apply sorting
        if (in_array($sortField, ['name', 'price', 'createdAt'])) {
            $queryBuilder->orderBy('p.' . $sortField, $sortOrder === 'desc' ? 'DESC' : 'ASC');
        }

        // Apply pagination
        $queryBuilder
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        $products = $queryBuilder->getQuery()->getResult();
        $total = count($this->productRepository->findAll());

        $data = [
            'items' => $products,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($total / $limit)
        ];

        $json = $this->serializer->serialize($data, 'json', ['groups' => 'product:read']);
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'product_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);
        
        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $this->serializer->serialize($product, 'json', ['groups' => 'product:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('', name: 'product_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $product = new Product();
        $this->updateProductFromData($product, $data);

        $errors = $this->validator->validate($product);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return new JsonResponse(['message' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        $data = $this->serializer->serialize($product, 'json', ['groups' => 'product:read']);
        return new JsonResponse($data, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'product_update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);
        
        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $this->updateProductFromData($product, $data);

        $errors = $this->validator->validate($product);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return new JsonResponse(['message' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $product->setUpdatedAt(new \DateTimeImmutable());
        $this->entityManager->flush();

        $data = $this->serializer->serialize($product, 'json', ['groups' => 'product:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'product_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);
        
        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    private function updateProductFromData(Product $product, array $data): void
    {
        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice((string) $data['price']);
        }
        if (isset($data['stock'])) {
            $product->setStock((int) $data['stock']);
        }
        if (isset($data['categoryId'])) {
            $category = $this->categoryRepository->find($data['categoryId']);
            if ($category) {
                $product->setCategory($category);
            }
        }
    }
}
