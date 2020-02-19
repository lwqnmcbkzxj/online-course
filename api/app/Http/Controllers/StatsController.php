<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class StatsController extends Controller
{
	 public function __construct() {
      $this->middleware('auth');
  }
      public function getStatsByUser()
    {
    	  $id = Auth::id();
        $all = DB::select("SELECT COUNT(*) AS num FROM sections
        UNION ALL
        SELECT COUNT(*) AS num FROM lesson_info GROUP BY content_type");
        $email = DB::select("SELECT email from users where id = ?", [$id]);
        if (empty($all)) return [];
    	return ["info" => ["role" => Auth::user()->role, "email" => $email[0]->email], "stats" => ["sections_count" => $all[0]->num ?? 0, "article_count" => $all[1]->num ?? 0, "task_count" => $all[2]->num ?? 0, "completed" => DB::select("SELECT type, COUNT(*) as count, JSON_ARRAYAGG(coalesce(article_element_id, task_element_id, section_id)) as ids FROM completed where user_id = ? GROUP BY type", [$id])]];

    }
    public function getStatsForAdmin()
    {

    }
    
      
}