'use strict';

SwaggerUi.Views.SignatureView = Backbone.View.extend({
  events: {
    'click a.description-link'       : 'switchToDescription',
    'click a.snippet-link'           : 'switchToSnippet',
    'click a.exampleXML-link'        : 'switchToXMLExample',
    'mousedown .snippet'             : 'snippetToTextArea',
    'mousedown .exampleXML'          : 'exampleXMLToTextArea'
  },

  initialize: function () {

  },

  render: function(){

    $(this.el).html(Handlebars.templates.signature(this.model));

    //this.switchToSnippet();
    this.switchToDescription();

    this.isParam = this.model.isParam;

    if (this.isParam) {
      $('.notice', $(this.el)).text('Click to set as parameter value');
    }

    return this;
  },

  // handler for show signature
  switchToDescription: function(e){
    if (e) { e.preventDefault(); }

    $('.snippet', $(this.el)).hide();
    $('.exampleXML',  $(this.el)).hide();
    $('.description', $(this.el)).show();
    $('.description-link', $(this.el)).addClass('selected');
    $('.snippet-link', $(this.el)).removeClass('selected');
    $('.exampleXML-link',  $(this.el)).removeClass('selected');
  },

  // handler for show signature
  switchToXMLExample: function(e){
    if (e) { e.preventDefault(); }

    $('.snippet',     $(this.el)).hide();
    $('.exampleXML',  $(this.el)).show();
    $('.description', $(this.el)).hide();
    $('.description-link', $(this.el)).removeClass('selected');
    $('.snippet-link',     $(this.el)).removeClass('selected');
    $('.exampleXML-link',  $(this.el)).   addClass('selected');
  },

  // handler for show sample
  switchToSnippet: function(e){
    if (e) { e.preventDefault(); }

    $('.description', $(this.el)).hide();
    $('.exampleXML',  $(this.el)).hide();
    $('.snippet',     $(this.el)).show();
    $('.snippet-link',     $(this.el)).   addClass('selected');
    $('.exampleXML-link',  $(this.el)).removeClass('selected');
    $('.description-link', $(this.el)).removeClass('selected');
  },

  // handler for output to text area
  textToTextArea: function(e, sampleText) {
    if (this.isParam) {
      if (e) { e.preventDefault(); }

      var textArea = $('textarea', $(this.el.parentNode.parentNode.parentNode));
      if ($.trim(textArea.val()) === '') {

        textArea.val(sampleText);

        setTimeout(function() {
          textArea.height( textArea.prop('scrollHeight') );
        },1);
      }
    }
  },

  // handler for snippet to text area
  snippetToTextArea: function(e) {
    this.textToTextArea(e, this.model.sampleJSON);
    $('div select[name=parameterContentType]', $(this.el.parentNode.parentNode.parentNode)).val('application/json');
  },

  // handler for XML example to text area
  exampleXMLToTextArea: function(e) {
    this.textToTextArea(e, this.model.exampleXML);
    $('div select[name=parameterContentType]', $(this.el.parentNode.parentNode.parentNode)).val('application/xml');
  }
});