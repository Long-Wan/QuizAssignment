var UserView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

UserView.prototype = {
    init: function() {
        this.questionCount = 0;
        this.setElements();
        this.loadAppBar();
        this.setListeners();
    },
    setElements: function() {                   //Sets elements
        this.appbar = $('.nav-container');
        this.quizContainer = $('#quizContainer');
        this.submitBtn = $('#submitBtn');
        this.resetBtn = $('#resetBtn');
    },
    loadAppBar: function() {                    //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {                  //Sets listeners
        this.submitBtn.click(this.gradeQuiz.bind(this));
        this.resetBtn.click(this.resetQuiz.bind(this));
    },
    checkQuiz: function() {                     //Checks if there is a quiz and display
        $.when(this.retrieveQuiz()).done((data) => {
            if (data.length > 0) {
                this.displayQuiz(data);
            } else {
                this.noQuiz();
            }
        });
    },
    displayQuiz: function(quiz) {               //Generates and displays quiz
        var quizHtml = '';
        quiz.forEach(element => {
            
            if (element.hardMode) {
                quizHtml += '<div class="quiz-question card" value="' + element.correctAnswer + '"><span class="new badge purple" data-badge-caption="Hard"></span><div class="card-content">';
            } else {
                quizHtml += '<div class="quiz-question card" value="' + element.correctAnswer + '"><span class="new badge green" data-badge-caption="Easy"></span><div class="card-content">';
            }
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
    noQuiz: function() {                        //Error message for no quiz
        let message = '<div class="no-quiz center"><h4>No quiz has been created, go to the <a href="Admin.html">Admin</a> page to create a quiz</h4></div>';
        this.quizContainer.html(message);
        this.submitBtn.hide();
    },
    gradeQuiz: function() {                     //Grades the quiz and submits if user is logged in
        var correctCount = 0;
        this.quizContainer.children().each((i, question) => {
            var correct = $(question).attr('value');
            $(question).find('.answer-choice').each((i, choice) => {
                if ($(choice).find('.answer-check').is(':checked')) {
                    if ($(choice).find('.answer-text').html() != correct) {
                        $(choice).find('.answer-text').addClass('red');
                    } else {
                        correctCount++;
                    }
                }
                if ($(choice).find('.answer-text').html() == correct) {
                    $(choice).find('.answer-text').addClass('green');
                }
            });
        });
        this.submitBtn.addClass('disabled');
        $('.answer-check').attr('disabled', 'disabled');

        let user = this.getCurUser();
        if (user) {
            this.submitRanking(user.username, correctCount, this.questionCount);
        }
    },
    resetQuiz: function() {                 //Resets quiz
        this.questionCount = 0;
        this.submitBtn.removeClass('disabled');
        this.checkQuiz();
    }
};