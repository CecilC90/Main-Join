function renderSummaryHTML() {
    summary = document.getElementById('summaryContainer');
    summary.innerHTML = `
            <div class="headline">
                <span class="fs-61 fw-700">Join 360</span>
                <span class="seperator"></span>
                <span class="fs-27 fw-400">Key Metrics at a Glance</span>
                <span class="seperator-mobile"></span>
            </div>
            <div class="flex-container">
                <div class="main-task-container">
                    <div class="check-rectangle">
                        <div>
                            <a href="board.html">
                                <div class="button-container gap-18">
                                    <div class="elipse">
                                        <div>
                                            <img class="edit-icon" src="./assets/img/edit.svg" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-64 fw-600 center-text" id="toDo"></div>
                                        <div class="fs-20 ">To-do</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a href="board.html#done">
                                <div class="button-container gap-18">
                                    <div class="elipse">
                                        <div>
                                            <img class="vector-icon" src="./assets/img/vector.svg" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-64 fw-600 center-text" id="done"></div>
                                        <div class="fs-20 ">Done</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="urgency-summary">
                        <a href="board.html">
                            <div class="urgency-container">
                                <div class="flex-container center gap-18">
                                    <div class="elipse-urgency">
                                        <div class="flex-container flex-column center">
                                            <img class="arrow-icon" src="./assets/img/arrow.svg" alt="">
                                            <img class="arrow-icon mt-minus-5" src="./assets/img/arrow.svg" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-64 fw-600 center-text" id="high"></div>
                                        <div class="fs-16">Urgent</div>
                                    </div>
                                </div>
                                <div class="line"></div>
                                <div>
                                    <div class="fw-700 fs-2 pb-13" id="deadline"></div>
                                    <div class="fs-16">Upcoming Deadline</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="overview-container">
                        <a href="board.html">
                            <div class="task-container">
                                <div class="fs-64 fw-600" id="boardTasks"></div>
                                <div class="fs-20 fw-400">Tasks in Board</div>
                            </div>
                        </a>
                        <a href="board.html">
                            <div class="task-container">
                                <div class="fs-64 fw-600" id="progress">x</div>
                                <div class="fs-20 fw-400">Tasks in Progress</div>
                            </div>
                        </a>
                        <a href="board.html#feedback">
                            <div class="task-container">
                                <div class="fs-64 fw-600" id="await"></div>
                                <div class="fs-20 fw-400">Awaiting Feedback</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="greet-container">
                    <div class="fs-47 fw-500 greeting greeting-content" id="greeting"></div>
                    <div class="name-container name" id="name"></div>
                </div>
            </div>
    `;
}