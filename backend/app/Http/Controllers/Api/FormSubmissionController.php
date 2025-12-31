<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Templates;

class FormSubmissionController extends Controller
{
    public function getSchema(){
      $template =  Templates::first();
      dd($template);
    }

    public function store(){

    }


    public function excelImport(){

    }

    public function excelExport(){

    }
}
