<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps(0);
            $table->tinyInteger('role');
            $table->string('email', 100);
            $table->string('token', 100);
            $table->string('password', 100);
            $table->unique('email');
            $table->unique('token');

        });
        Schema::create('exercises', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps(0);
            $table->tinyInteger('type');
            $table->string('text', 500);
            $table->string('media', 300);

        });
          Schema::create('sections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 200);
            $table->unsignedBigInteger('exercise_id');
            $table->foreign('exercise_id')->references('id')->on('exercises');

        });
           Schema::create('stats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('score');  
            $table->unsignedBigInteger('exercise_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('exercise_id')->references('id')->on('exercises');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(['users', 'exercises', 'sections', 'stats']);
    }
}
