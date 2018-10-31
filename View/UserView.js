var UserView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

UserView.prototype = {
    init: function() {
        this.questionCount = 1;
        this.setElements();
        this.loadAppBar();
        this.setListeners();
    },
    setElements: function() {
        this.appbar = $('.nav-container');
        this.quizContainer = $('#quizContainer');
        this.submitBtn = $('#submitBtn');
        this.resetBtn = $('#resetBtn');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {
        this.submitBtn.click(this.gradeQuiz.bind(this));
        this.resetBtn.click(this.resetQuiz.bind(this));
    },
    checkQuiz: function() {
        $.when(this.retrieveQuiz()).done((data) => {
            if (data) {
                this.displayQuiz(data);
            } else {
                this.noQuiz();
            }
        });
    },
    displayQuiz: function(quiz) {
        var quizHtml = '';
        quiz.forEach(element => {
            quizHtml += '<div class="quiz-question card" value="' + element.correctAnswer + '"><div class="card-content">';
            quizHtml += '<span class="card-title question-text">' + element.question + '</span>';
            element.answers.forEach(answer => {
                quizHtml += '<div class="answer-choice row">';
                quizHtml += '<label class="col s1 answer-label"><input name="group' + this.questionCount + 
                    '" class="answer-check" required="true" aria-required="true" type="radio" /><span></span></label><p class="answer-text col s11">' + answer.text + '</p>';
                quizHtml += '</div>';
            });
            quizHtml += '</div></div>';
            this.questionCount++;
        });
        this.quizContainer.html(quizHtml);
    },
    noQuiz: function() {
        let message = '<div class="no-quiz center"><h4>No quiz has been created, go to the <a href="Admin.html">Admin</a> page to create a quiz</h4></div>';
        this.quizContainer.html(message);
        this.submitBtn.hide();
    },
    gradeQuiz: function() {
        this.quizContainer.children().each(function(i) {
            var correct = $(this).attr('value');
            $(this).find('.answer-choice').each(function(i) {
                if ($(this).find('.answer-check').is(':checked')) {
                    if ($(this).find('.answer-text').html() != correct) {
                        $(this).find('.answer-text').addClass('red');
                    }
                }
                if ($(this).find('.answer-text').html() == correct) {
                    $(this).find('.answer-text').addClass('green');
                }
            });
        });
        this.submitBtn.addClass('disabled');
        $('.answer-check').attr('disabled', 'disabled');
    },
    resetQuiz: function() {
        this.submitBtn.removeClass('disabled');
        this.checkQuiz();
    }
};