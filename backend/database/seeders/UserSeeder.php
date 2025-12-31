<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => "Norma",
                'email' => "manishkuyadav090@gmail.com",
                'password' => bcrypt('norma'),
                'role_id'=>1

            ],
            [
                'name' => "Rickie",
                'email' => "rickie.vandervort@example.org",
                'password' => bcrypt('rickie'),
                'role_id'=>2

            ],
            [
                'name' => "Emailer",
                'email' => "emiller@example.org",
                'password' => bcrypt('emiler'),
                'role_id'=>3

            ]
        ];

        User::insert($users);
    }
}
