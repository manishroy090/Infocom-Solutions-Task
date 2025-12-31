<?php

namespace App\Repositories;
use App\Repositories\Interfaces\FormSubmissionRepositoryInterface;
use App\Models\FormSubmission;

class FormSubmissionRepository  implements FormSubmissionRepositoryInterface
{

    public function store($data){
      FormSubmission::insert($data);
    }

}