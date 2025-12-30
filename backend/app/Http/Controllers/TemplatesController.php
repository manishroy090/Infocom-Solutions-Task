<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Templates;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;


class TemplatesController extends Controller
{
    public $message;
    public $code;



    public function index()
    {
        Gate::authorize('template.index');
        return response()->json([
            'templates' => Templates::all()
        ]);
    }


    public function store(Request $request)
    {
        Gate::authorize('template.store');
        $validator =   Validator::make($request->all(), [
            'name' => 'required',
            'schema' => "required",
            'schema.*.label' => "required",
            'schema.*.placeholder' => "required",
            'schema.*.options' => [
                'nullable',
                function ($attribute, $value, $fail) use ($request) {
                    $index = explode('.', $attribute)[1];
                    $type = $request->schema[$index]['type'] ?? null;

                    if (in_array($type, ['select', 'radio'])) {
                        if (! is_array($value) || count($value) < 1) {
                            $fail('Options must be a non-empty array when type is select or radio');
                        }
                    }
                }
            ],
            'schema.*.type' => 'required'
        ], [
            'name.required' => 'Name is required',
            'schema.required' => "Schema is required",
            'schema.*.label' => "Schema label is required",
            'schema.*.options.required_if' => 'Options are required when type is option',
            'schema.*.placeholder' => "Schema Placeholder is required",
            'schema.*.type' => "Schema type is required",
        ]);
        if ($validator->fails()) {
            $this->message = 422;
            return response()->json([
                'validation_error' => $validator->messages()
            ], $this->message);
        }
        try {
            $this->code = 201;
            Templates::create($validator->validate());
            return response()->json([
                'message' => "Templates created successfully"
            ], $this->code);
        } catch (\Throwable $th) {
            $this->code = 500;
            return response()->json([
                'message' => "something went wrong"
            ], $this->code);
        }
    }


    public function edit($id)
    {
        Gate::authorize('template.edit');
        try {
            $templates = Templates::where('id', $id)->first();
            $this->code = 200;
        } catch (\Throwable $th) {
            $this->code = 500;
        }

        return response()->json([
            'templates' => $templates
        ], $this->code);
    }



    public function update(Request $request,$id)
    {
     Gate::authorize('template.update');

        $validator =   Validator::make($request->all(), [
            'name' => 'required',
            'schema' => "required",
            'schema.*.label' => "required",
            'schema.*.placeholder' => "required",
            'schema.*.options' => [
                'nullable',
                function ($attribute, $value, $fail) use ($request) {
                    $index = explode('.', $attribute)[1];
                    $type = $request->schema[$index]['type'] ?? null;

                    if (in_array($type, ['select', 'radio'])) {
                        if (! is_array($value) || count($value) < 1) {
                            $fail('Options must be a non-empty array when type is select or radio');
                        }
                    }
                }
            ],
            'schema.*.type' => 'required'
        ], [
            'name.required' => 'Name is required',
            'schema.required' => "Schema is required",
            'schema.*.label' => "Schema label is required",
            'schema.*.options.required_if' => 'Options are required when type is option',
            'schema.*.placeholder' => "Schema Placeholder is required",
            'schema.*.type' => "Schema type is required",
        ]);


        if ($validator->fails()) {
            $this->message = 422;
            return response()->json([
                'validation_error' => $validator->messages()
            ], $this->message);
        }
        try {
            $this->code = 201;
            Templates::where('id',$id)->update($validator->validate());
            return response()->json([
                'message' => "Templates updated successfully"
            ], $this->code);
        } catch (\Throwable $th) {
            $this->code = 500;
            return response()->json([
                'message' => "something went wrong"
            ], $this->code);
        }
    }


  
    public function delete() {
          Gate::authorize('template.delete');
        
    }
}
