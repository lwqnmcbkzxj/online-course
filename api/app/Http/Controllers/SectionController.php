<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SectionController extends Controller
{
	public function __construct() {
		  $this->middleware('auth');
		  //$this->middleware('admin');
	}
    public function getSections()
    {
       $ids = DB::select("SELECT id, title FROM sections");
       foreach($ids as $key => $value) {
        $res = DB::select("SELECT title, id, section_position, content_type FROM lesson_info WHERE section_id = ?", [$value->id]);
        $json_data[] = ["id" => $value->id, "title" => $value->title, "lessons" => $res];
       }
       return $json_data;
    }
   public function add(Request $request) {
        $this->validate($request, [
        'title' => 'required|string',
    ]);
       $title = $request->input('title');
       DB::insert("insert into `sections` (title) values (?)", [$title]);
       return ["status" => "ok"];


   }
   public function edit(Request $request) {
       $this->validate($request, [
        'id' => 'required|numeric',
        'title' => 'required|string'
    ]);
       DB::update('update sections set title = ? where id = ?', [$request->input('title'), $request->input('id')]);
       return ["status" => "ok"];
   }
   public function delete(Request $request) {
    $this->validate($request, [
        'id' => 'required|numeric',
    ]);
       $id = $request->input('id');
       DB::delete('delete from sections where id = ?', [$id]);
       return ["status" => "ok"];
   }

}
