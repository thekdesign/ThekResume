@extends('layouts.app')

@section('meta')

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="author" content="Kevin Xu" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

@endsection

@section('content')

<!-- Content
============================================= -->
<section id="content" class="nobg">

    <div class="content-wrap nobottompadding nobg">

        @include('pages.skills')

        @include('pages.about')

        @include('pages.cv')

        @include('pages.works')

        @include('pages.articles')

    </div>

</section><!-- #content end -->

@endsection
