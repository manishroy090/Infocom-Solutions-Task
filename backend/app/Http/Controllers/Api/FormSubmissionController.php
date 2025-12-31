<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Templates;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\FormSubmission;
use App\Http\Requests\FormSubmissionStore;
use App\Repositories\FormSubmissionRepository;
use Illuminate\Support\Facades\Gate;

class FormSubmissionController extends Controller
{

  public $formSubmissionRepository;
  public $code;


  public function __construct(FormSubmissionRepository $formSubmissionRepository)
  {
    $this->formSubmissionRepository = $formSubmissionRepository;
  }
  public function getSchema()
  {
    $template =  Templates::first();
    return response()->json([
      'template' => $template
    ], 200);
  }

  public function store(FormSubmissionStore $request)
  {

     Gate::authorize('form.submission');
    $validated = $request->validated();
    $formData = $request->except(['template_id', 'employee_id']);
    try {
      $formSubmission = [
        'template_id' => $validated['template_id'],
        'employee_id' => $validated['employee_id'],
        'data' => json_encode($formData)
      ];
      $this->formSubmissionRepository->store($formSubmission);
      $response = [
        'message' => "Form submitted successfully"
      ];
      $this->code = 201;
      log::info(['code'=>$this->code, 'message'=>$response['message']]);
    } catch (\Throwable $th) {

      $response = [
        'message' => "Something went wrong"
      ];
      $this->code = 500;
      log::info(['code'=>$this->code, 'message'=>$th->getMessage()]);
    }

    return response()->json($response, $this->code);
  }
}
