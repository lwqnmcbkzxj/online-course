<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class SectionController extends Controller
{
	public function __construct() {
		  $this->middleware('auth', ['except' => ['getSections']]);
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

   public function complete(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
    ]);
      try {
      DB::insert('insert into completed (user_id, type, section_id) values (?, 2, ?)', [Auth::id(), $request->input('id')]);
    }
     catch (\Throwable $e) {
      return ["error" => "wrong data"];
     }
      return ["status" => "ok"];
   }
   public function shift(Request $request) {
     $this->validate($request, [
        'type' => 'required|numeric',
        'id' => 'required|numeric',
    ]);
      switch ($type) {
        case 0:
               DB::update("insert into article_elements (lesson_id, type, text, lesson_position) values (? , 0, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from article_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 1:
               DB::insert("insert into article_elements (lesson_id, type, media, lesson_position) values (? , 1, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from article_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        default: return ["error" => "No such type"];
                 break;

      }
      return ["status" => "ok"];
   }

}
