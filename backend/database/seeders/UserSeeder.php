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
                'email' => "norma.hilpert@example.org",
                'password' => bcrypt('norma')

            ],
            [
                'name' => "Rickie",
                'email' => "rickie.vandervort@example.org",
                'password' => bcrypt('rickie')

            ],
            [
                'name' => "Emailer",
                'email' => "emiller@example.org",
                'password' => bcrypt('emiler')

            ]
        ];

        User::insert($users);
    }
}
