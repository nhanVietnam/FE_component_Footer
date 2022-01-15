<?php

namespace Components\footer\c42d5711b4fe847ed92380315cd7a20d5\c760ee12d14154372aa76882736609e7e;

use App\Utilities\ExtendedComponent;

class c760ee12d14154372aa76882736609e7e extends ExtendedComponent
{
    protected string $uuid = "c760ee12d14154372aa76882736609e7e";
    protected string $group_id = "c42d5711b4fe847ed92380315cd7a20d5";
    protected string $type = "footer";
    protected string $name = "footer";
    protected string $description = "footer of the page";
    // variables used in pug template
    protected array $variables = [
        
    ];
    // define which type of input each variable uses
    // AVAILABLE TYPES
    // ckeditor: for writing articles, large content
    // checkbox: for toggling on/off
    // input: for writing name, title, small content
    // media-input: for inserting images/iframes
    // multi-media-input: for inserting multiple images/iframes
    // select: for selecting content from a dropdown list
    // sortable: for a draggable sorting input
    // tag-input: for selecting multiple tags
    // textarea: for writing notes
    protected array $input_types = [
        
    ];
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view("$this->type.$this->uuid.$this->uuid");
    }
}