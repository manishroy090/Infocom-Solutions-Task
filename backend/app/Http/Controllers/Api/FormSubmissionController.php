<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Templates;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\FormSubmission;


class FormSubmissionController extends Controller
{
  public function getSchema()
  {
    $template =  Templates::first();
    return response()->json([
      'template' => $template
    ], 200);
  }

  public function store(Request $request)
  {
    $template = Templates::where('id', $request->template_id)->get();
    $fields = $template[0]['schema'];
    foreach ($fields as $key => $field) {
      $rule = [];
      if ($field['required']) {
        $rule[] = 'required';
      } else {
        $rule[] = 'nullable';
      }
      switch ($field['type']) {
        case 'text':
          $rule[] = 'string';
          break;

        case 'email':
          $rule[] = 'email';
          break;
        case 'number':
          $rule[] = 'numeric';
          break;
        case 'date':
          $rule[] = 'date';
          break;
        case 'file':
          $rule[] = 'file';
          $rule[] = 'max:2048';
          break;
      }

      $fieldKey =str_replace(" ", "", strtolower($field['label']));
      log::info($fieldKey );
      $rules[$fieldKey] = implode('|', $rule);
      $messages[$fieldKey] =
        "{$field['label']} is required";
    }
    $validating =  Validator::make($request['formdata'], $rules, $messages);
    if ($validating->fails()) {
      return response()->json([
        "validation_error" =>  $validating->messages()
      ], 422);
    }

    try {
      
      $formSubmission = [
        'template_id'=>$request->template_id,
        'employee_id'=>$request->employee_id,
        'data'=>json_encode($validating->validate())
      ];

     FormSubmission::insert($formSubmission);
      return response()->json([
        'message'=>"Form submitted successfully"
      ],201);

    } catch (\Throwable $th) {
       return response()->json([
        'message'=>$th->getMessage()
      ],500);
    }
  }


  public function excelImport() {}

  public function excelExport() {}
}
