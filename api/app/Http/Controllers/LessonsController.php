<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
class LessonsController extends Controller
{
	public function __construct() {
		  $this->middleware('auth', ['except' => ['getTasks', 'getSingle']]);
	}
    public function getSingle($id) {
       $type = DB::select("SELECT * from lesson_info where id = ?", [$id]);
       if (empty($type)) return [];
       if ($type[0]->content_type==0)
       return ["id" => $id, "type" => 0, "elements" =>DB::select("SELECT id, type, text, media, lesson_position from article_elements where lesson_id = ?", [$id])];
       else 
        {  
          DB::update('update lesson_info set viewed = viewed + 1 where id = ?', [$id]);
          return ["id" => $id, "type" => 1, "elements" => DB::select("SELECT id, type, json_quiz_options, text, media, json_quiz_answers, lesson_position from task_elements where lesson_id = ?", [$id])];
 }
}
   public function getTasks() {
   	   return DB::select("SELECT id, title, viewed from lesson_info where content_type = 1");
   }
   public function add(Request $request) {
     $this->validate($request, [
        'section_id' => 'required|numeric',
        'content_type' => 'required|numeric'
    ]);
       $title = $request->input('title');
       $section_id = $request->input('section_id');
       $content_type = $request->input('content_type');
       DB::delete("delete from completed where section_id = ? and user_id = ?", [$section_id, Auth::id()]);
       DB::insert("insert into `lesson_info` (title, section_id, content_type, section_position) values (?, ?, ?, (select coalesce(t.m, 0) + 1 from (select max(section_position) as m from lesson_info where section_id=?) t))", ["New Lesson", $section_id, $content_type, $section_id]);
       return ["status" => "ok"];

   }
   public function addLike(Request $request) {
      $this->validate($request, [
        'id' => 'required|numeric'
    ]);
      try {
            DB::insert('insert into liked (user_id, lesson_id) values (?, ?)', [Auth::id(), $request->input('id')]);
          }
      catch (\Throwable $e) {
        return ["error" => "liked already"];
      }
     return ["status" => "ok"];
   }
   public function addTaskElements(Request $request) {
      $this->validate($request, [
        'type' => 'required|numeric',
        'data' => 'nullable',
        'lesson_id' => 'required|numeric'
    ]);
      $type = $request->input('type');
      $data = $request->input('data');
      $lesson_id = $request->input('lesson_id');
      switch ($type) {
        case 0:
               DB::insert("insert into task_elements (lesson_id, type, text, lesson_position) values (? , 0, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from task_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 1:
               DB::insert("insert into task_elements (lesson_id, type, media, lesson_position) values (? , 1, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from task_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 2:
               DB::insert("insert into task_elements (lesson_id, type, media, lesson_position) values (? , 2, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from task_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 3:
               //todo
               DB::insert("insert into task_elements (lesson_id, type, json_quiz_options, json_quiz_answers, lesson_position) values (?, 3, ?, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from task_elements where lesson_id = ?) t))", [$lesson_id, $data[0], $data[1], $lesson_id]);
               break;
        default: return ["error" => "No such type"];
                 break;

      }
      return ["status" => "ok"];

   }

   public function addArticleElements(Request $request) {
       $this->validate($request, [
        'type' => 'required|numeric',
        'data' => 'nullable',
        'lesson_id' => 'required|numeric'
    ]);
      $type = $request->input('type');
      $data = $request->input('data');
      $lesson_id = $request->input('lesson_id');
      switch ($type) {
        case 0:
               DB::insert("insert into article_elements (lesson_id, type, text, lesson_position) values (? , 0, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from article_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 1:
               DB::insert("insert into article_elements (lesson_id, type, media, lesson_position) values (? , 1, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from article_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        case 2:
               DB::insert("insert into article_elements (lesson_id, type, media, lesson_position) values (? , 2, ?, (select coalesce(t.m, 0) + 1 from (select max(lesson_position) as m from article_elements where lesson_id = ?) t))", [$lesson_id, $data, $lesson_id]);
               break;
        default: return ["error" => "No such type"];
                 break;

      }
      return ["status" => "ok"];

   }

   public function deleteTaskElementSingle(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
    ]);
     $id = $request->input('id');
    DB::delete("DELETE FROM task_elements where id = ?", [$id]);
    return ["status" => "ok"];

   }
   public function deleteArticleElementSingle(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
    ]);
     $id = $request->input('id');
    DB::delete("DELETE FROM article_elements where id = ?", [$id]);
    return ["status" => "ok"];
   }
    public function delete(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'section_id' => 'required|numeric'
    ]);
    $id = $request->input('id');
    $section_id = $request->input('section_id');
    $all = DB::select("SELECT COUNT(*) as num FROM lesson_info WHERE section_id = ? UNION ALL SELECT COUNT(*) as num FROM completed c JOIN lesson_info l ON l.id = CASE
               WHEN c.type IN (0)
                   THEN  c.article_element_id
               WHEN c.type IN (1)
                   THEN c.task_element_id
               END 
WHERE l.section_id = ? UNION ALL SELECT COUNT(*) as num FROM completed WHERE article_element_id = ? or task_element_id = ?", [$section_id, $section_id, $id, $id]);
    if ($all[0]->num - 1 == $all[1]->num && $all[2]->num == 0 && $all[1]->num >= 1) DB::insert("insert ignore into completed (user_id, section_id, type) values (?, ?, 2)", [Auth::id(), $section_id]);
    DB::delete("DELETE FROM lesson_info where id = ?", [$id]);
    return ["status" => "ok"];
   }
   public function editArticleText(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'text' => 'required|string'
    ]);
     DB::update('update article_elements set text = ? where id = ?', [$request->input('text'), $request->input('id')]);
    return ["status" => "ok"];

   }

   public function editArticleMedia(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'media' => 'required|string'
    ]);
     DB::update('update article_elements set media = ? where id = ?', [$request->input('media'), $request->input('id')]);
    return ["status" => "ok"];
   }
    public function editTaskText(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'text' => 'required|string'
    ]);
     DB::update('update task_elements set text = ? where id = ?', [$request->input('text'), $request->input('id')]);
    return ["status" => "ok"];

   }

   public function editTaskMedia(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'media' => 'required|string'
    ]);
     DB::update('update task_elements set media = ? where id = ?', [$request->input('media'), $request->input('id')]);
    return ["status" => "ok"];
   }
    public function editTaskQuiz(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'json_options' => 'required|string',
        'json_answers' => 'required|string'
    ]);
     //dd($request->input('json_options'));
     DB::update('update task_elements set json_quiz_options = ?, json_quiz_answers = ? where id = ?', [$request->input('json_options'), $request->input('json_answers'), $request->input('id')]);
    return ["status" => "ok"];
   }

   public function complete(Request $request) {
     $this->validate($request, [
        'id' => 'required|numeric',
        'type' => 'required|numeric'
    ]);
     $type = $request->input('type');
     try {
       switch ($type) {
        case 0:
               DB::insert('insert into completed (user_id, type, article_element_id) values (?, 0, ?)', [Auth::id(), $request->input('id')]);
               break;
        case 1:
               DB::insert('insert into completed (user_id, type, task_element_id) values (?, 1, ?)', [Auth::id(), $request->input('id')]);
               break;
        default: return ["error" => "No such type"];
               break;
            }
          }
        catch (\Throwable $e) {
          return ["error" => "wrong data"];
        }

    return ["status" => "ok"];
   }
    public function edit(Request $request) {
       $this->validate($request, [
        'id' => 'required|numeric',
        'title' => 'required|string'
    ]);
       DB::update('update lesson_info set title = ? where id = ?', [$request->input('title'), $request->input('id')]);
       return ["status" => "ok"];
   }

}


