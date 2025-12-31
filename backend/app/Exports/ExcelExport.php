<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\Templates;
use Illuminate\Support\Facades\Log;
use App\Models\FormSubmission;



class ExcelExport implements  FromArray, WithHeadings
{

    protected int  $templateId;
  
    public function __construct(int $templateId)
    {
        $this->templateId =$templateId;
    }
  


    public function headings ():array
    {
        $template = Templates::findOrFail($this->templateId);
        $fields = collect($template->schema)
        ->map(fn ($f) => strtolower(str_replace(' ', '', $f['label'])))
        ->toArray();
        return array_merge(['employee_id'], $fields);

    }


    public function array(): array
    {
     return  FormSubmission::where('template_id', $this->templateId)
            ->get()
            ->map(function ($row) {
                return array_merge(
                    ['employee_id' => $row->employee_id],
                    $row->data
                );
            })
            ->toArray();
     
    }
}
