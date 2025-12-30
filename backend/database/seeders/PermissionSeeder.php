<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
              [
                'title' => "template.index",
                'status' => 1
            ],
            [
                'title' => "template.store",
                'status' => 1
            ],
             [
                'title' => "template.view",
                'status' => 1
            ],
            [
                'title' => "template.edit",
                'status' => 1
            ],
              [
                'title' => "template.update",
                'status' => 1
            ],
            [
                'title' => "template.delete",
                'status' => 1
            ],
            [
                'title' => "users.list",
                'status' => 1
            ],
            [
                'title' => "form.submission",
                'status' => 1
            ]
        ];

        Permission::insert($permissions);
    }
}
