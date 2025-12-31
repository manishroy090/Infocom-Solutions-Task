<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Templates;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\TemplateStoreRequest;
use App\Http\Requests\TemplateUpdateRequest;
use Illuminate\Support\Facades\Log;
use App\Repositories\TemplatesRepository;
use Nette\Utils\Json;
use App\Exports\ExcelExport;
use App\Imports\ExcelImport;
use Maatwebsite\Excel\Facades\Excel;


class TemplatesController extends Controller
{
    public $message;
    public $code;

    public $templatesRepository;

    public function __construct(TemplatesRepository $templatesRepository)
    {
        $this->templatesRepository = $templatesRepository;
    }

    public function index()
    {
        Gate::authorize('template.index');
        return response()->json([
            'templates' => Templates::all()
        ]);
    }


    public function store(TemplateStoreRequest $request)
    {
        Gate::authorize('template.store');
        $validated = $request->validated();
        try {
            $this->code = 201;
            $data = [
                'name' => $validated['name'],
                'schema' => json_encode($validated['schema'])
            ];
            $this->templatesRepository->store($data);
            $response = [
                'message' => "Templates created successfully"
            ];
            Log::info($response);
        } catch (\Throwable $th) {
            log::error($th->getMessage());
            $this->code = 500;
            $response = [
                'message' => "Something went"
            ];
        }

        return response()->json($response, $this->code);
    }


    public function edit($id)
    {
        Gate::authorize('template.edit');
        try {
            $templates = $this->templatesRepository->edit($id);
            $this->code = 200;
            $response = [
                'message' => "Template fetched successfully",
                "templates" =>  $templates
            ];
        } catch (\Throwable $th) {
            $this->code = 500;
            $response = [
                'message' => "Unable to fetch template",
                "templates" => []
            ];
        }
        return response()->json($response, $this->code);
    }



    public function update(TemplateUpdateRequest $request, $id)
    {
        Gate::authorize('template.update');
        $validated = $request->validated();
        try {
            $this->code = 201;
            $this->templatesRepository->update($validated, $id);
            $response = [
                'message' => "Templates updated successfully",
            ];
            Log::info($response);
        } catch (\Throwable $th) {
            log::error($th->getMessage());
            $this->code = 500;
            $response = [
                'message' => "Something went wrong",
            ];
        }

        return response()->json($response, $this->code);
    }



    public function delete()
    {
        Gate::authorize('template.delete');
    }

    public function export($id)
    {
        return Excel::download(
            new ExcelExport($id),
            "template_{$id}_submissions.xlsx"
        );
    }

    public function import(Request $request, $id)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv'
        ]);

        try {
            Excel::queueImport(
                new ExcelImport($id),
                $request->file('file')
            );
            $response =    [
                'message' => 'Import started successfully'
            ];
            $code = 201;
        } catch (\Throwable $th) {
            $response =   [
                'message' => 'Import started successfully'
            ];
            $code = 500;
        }

        return  response()->json($response,$code);
    }
}
