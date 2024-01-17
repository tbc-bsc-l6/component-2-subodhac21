<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;
    public function definition(): array
    {
    $category = Category::factory()->create();

        return [
            //
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(),
            'quantity' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->randomFloat(2, 10, 100),
            'category_id' => $category->id,
            'discount_id' => $this->faker->randomFloat(2, 0, 10),
        ];
    }
}
