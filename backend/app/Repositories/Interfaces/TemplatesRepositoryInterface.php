<?php
namespace App\Repositories\Interfaces;

interface TemplatesRepositoryInterface{

  public function store($data);
  public function edit($id);
  public function update($data , $id);
}
