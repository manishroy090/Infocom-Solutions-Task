<?php

namespace App\Imports;
use App\Models\Templates;
use App\Models\FormSubmission;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExcelImport implements OnEachRow, WithHeadingRow,WithChunkReading, ShouldQueue
{
    /**
    * @param Collection $collection
    */
   protected $template ;
   
   public function __construct(int $templateId)
   {
    
    $this->template = Templates::where('id',$templateId)->first();
   }

public function onRow(Row $row): void
{
    $rowData = $row->toArray();
    $item = [
        'employee_id' => $rowData['employee_id'] ?? null,
        'template_id'=>$this->template->id,
        'data' => [],
    ];

    foreach ($rowData as $column => $value) {
        if ($column !== 'employee_id') {
            $item['data'][$column] = $value;
        }
    }
    $item['data'] = json_encode($item['data'], JSON_UNESCAPED_UNICODE);
    $result = [$item];
    FormSubmission::insert($result);
}

  public function chunkSize(): int
    {
        return 500;
    }


}
