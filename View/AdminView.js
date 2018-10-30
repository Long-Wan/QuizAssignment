var AdminView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

AdminView.prototype = {
    init: function() {
        this.questionCount = 1;
        this.setElements();
        this.loadAppBar();
        this.setListeners();
        this.setConfirmation();
    },
    setElements: function() {
        this.appbar = $('.nav-container');
        this.form = $('#quizForm');
        this.questionContainer = $('#questionContainer');
        this.addBtn = $('#addBtn');
        this.modal = $('#saveModal');
        this.userLink = $('#userPage');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {
        this.addBtn.click(this.newQuestion.bind(this));
        this.form.submit(this.saveQuestions.bind(this));
    },
    setConfirmation: function() {
        window.onbeforeunload = () => {
            return "If you leave this page, any unsaved changes will be abandoned";
        }
    },
    checkQuestions: function() {
        $.when(this.retrieveQuestions()).done((data) => {
            if (data.length > 0) {
                this.displayQuestions(data);
            } else {
                this.newQuestion();
            }
        });
    },
    displayQuestions: function(questions) {
        questions.forEach(element => {
            let questionHtml = '<div class="question card"><div class="card-content">';
            questionHtml += '<div class="row">';
            questionHtml += '<h5 class="col s6">Question</h5>';
            if (element.hardMode) {
                questionHtml += '<div class="switch difficulty col s6"><label class="right">Easy<input class="hardMode" type="checkbox" checked=true><span class="lever"></span>Hard</label></div>';
            } else {
                questionHtml += '<div class="switch difficulty col s6"><label class="right">Easy<input class="hardMode" type="checkbox"><span class="lever"></span>Hard</label></div>';
            }
            questionHtml += '</div>';
            questionHtml += '<textarea id="textarea' + this.questionCount + '" class="materialize-textarea validate" required="true" aria-required="true" type="text">' + element.question + '</textarea>';
            questionHtml += '<label for="textarea' + this.questionCount + '">Question Text *</label>';
            questionHtml += '<h6>Answers *</h6>';
            for (var i = 0; i < 4; i++) {
                questionHtml += '<div class="answer-choice row">';
                if (element.answers[i].text == element.correctAnswer) {
                    questionHtml += '<label class="col s1 answer-label"><input name="group' + this.questionCount + '" class="answer-check" required="true" aria-required="true" type="radio" checked/><span></span></label>';
                } else {
                    questionHtml += '<label class="col s1 answer-label"><input name="group' + this.questionCount + '" class="answer-check" required="true" aria-required="true" type="radio" /><span></span></label>';
                }
                questionHtml += '<input class="answer-text col s11" type="text" required="true" aria-required="true" class="validate" value="' + element.answers[i].text + '">';
                questionHtml += '</div>';
            }
            questionHtml += '<div class="row removeRow"><a class="removeBtn btn-floating btn-small waves-effect waves-light red right"><i class="material-icons">remove</i></a></div>';
            questionHtml += '</div></div>';

            this.questionContainer.append(questionHtml);
            this.questionCount++;
            $('.removeBtn').click(this.removeQuestion.bind(this));
        });
    },
    newQuestion: function() {
        let questionHtml = '<div class="question card"><div class="card-content">';
        questionHtml += '<div class="row">';
        questionHtml += '<h5 class="col s6">Question</h5>';
        questionHtml += '<div class="switch difficulty col s6"><label class="right">Easy<input class="hardMode" type="checkbox"><span class="lever"></span>Hard</label></div>'
        questionHtml += '</div>';
        questionHtml += '<textarea id="textarea' + this.questionCount + '" class="materialize-textarea validate" required="true" aria-required="true" type="text"></textarea>';
        questionHtml += '<label for="textarea' + this.questionCount + '">Question Text *</label>';
        questionHtml += '<h6>Answers *</h6>';
        for (var i = 0; i < 4; i++) {
            questionHtml += '<div class="answer-choice row">';
            questionHtml += '<label class="col s1 answer-label"><input name="group' + this.questionCount + '" class="answer-check" required="true" aria-required="true" type="radio" /><span></span></label><input class="answer-text col s11" type="text" required="true" aria-required="true" class="validate">';
            questionHtml += '</div>';
        }
        questionHtml += '<div class="row removeRow"><a class="removeBtn btn-floating btn-small waves-effect waves-light red right"><i class="material-icons">remove</i></a></div>';
        questionHtml += '</div></div>';

        this.questionContainer.append(questionHtml);
        this.questionCount++;
        $('.removeBtn').click(this.removeQuestion.bind(this));
    },
    removeQuestion: function() {
        $(arguments[0].target).parent().parent().parent().parent().remove();
    },
    saveQuestions: function() {
        var view = this;
        var count = 1;
        this.questionContainer.children().each((i, question) => {
            let questionJson = {};
            questionJson['id'] = count++;
            console.log($(question).find('.hardMode'));
            questionJson['hardMode'] = $(question).find('.hardMode').prop('checked');
            questionJson['question'] = $(question).find('.materialize-textarea').val();
            questionJson['answers'] = [];
            $(question).find('.answer-choice').each((i, q) => {
                if($(q).find('.answer-check').is(':checked')) {
                    questionJson['correctAnswer'] = $(q).find('.answer-text').val();
                }
                questionJson['answers'].push({'text': $(q).find('.answer-text').val()});
            });
            view.addQuestion(questionJson);
        });
        this.storeQuestions();
        M.toast({html: 'Quiz saved, go to the User page to take it', classes: 'green'});
    },
    clearForm: function() {
        this.questionContainer.empty();
        this.questionCount = 1;
        this.newQuestion();
    }
};