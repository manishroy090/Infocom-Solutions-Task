<?php

namespace App\Repositories;
use App\Models\Templates;
use App\Repositories\Interfaces\TemplatesRepositoryInterface;


class TemplatesRepository implements TemplatesRepositoryInterface
{



    public function store($data){
        Templates::insert($data);
    }


    public function edit($id){
      return   Templates::where('id', $id)->first();
    }
    public function update($data ,$id){
        Templates::where('id',$id)->update($data);
    }

}