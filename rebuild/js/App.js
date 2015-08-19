(function(){
    var editor, viewport;

    editor      = new Editor();
    viewport    = new Viewport(editor);
    document.body.appendChild(viewport);

})(document, Editor, Viewport);