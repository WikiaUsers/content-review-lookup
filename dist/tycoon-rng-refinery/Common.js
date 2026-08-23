/* Any JavaScript here will be loaded for all users on every page load. */
/* =========================================================
   TYCOON RNG CONVEYOR SIMULATOR
   Page: [[Covnveyor Simulator]]
========================================================= */

(function () {

    /* =====================================================
       ONLY RUN ON:
       Covnveyor Simulator
    ===================================================== */

    if (mw.config.get("wgPageName") !== "Conveyor_Simulator") {
        return;
    }


    $(function () {

        const root =
            document.getElementById(
                "tycoon-rng-simulator"
            );


        if (!root) {
            return;
        }


        /* =================================================
           BUILD USER INTERFACE
        ================================================= */

        root.innerHTML = `

            <div class="sim-controls">

                <label>
                    Hazard Effect:

                    <select id="sim-effect-type">

                        <option value="7.5">
                            Fire (7.5s)
                        </option>

                        <option value="7.5" selected>
                            Nuclear (7.5s)
                        </option>

                        <option value="12">
                            Acid (12.0s)
                        </option>

                    </select>

                </label>


                <button
                    id="sim-hazard-button"
                    class="sim-active">

                    Place Hazard Effect

                </button>


                <button id="sim-remover-button">

                    Place Effect Remover

                </button>


                <button id="sim-run-button">

                    ▶ Run Simulation

                </button>


                <button id="sim-reset-button">

                    Reset Map

                </button>

            </div>


            <div class="sim-instructions">

                Red = Hazard Effect
                &nbsp; | &nbsp;
                Cyan = Effect Remover

            </div>


            <div class="sim-canvas-wrap">

                <canvas
                    id="sim-map-canvas"
                    width="850"
                    height="1120">
                </canvas>

            </div>


            <div class="sim-legend">

                <span>

                    <span
                        class="sim-dot sim-dot-upgrader">
                    </span>

                    Upgrader Slot

                </span>


                <span>

                    <span
                        class="sim-dot sim-dot-hazard">
                    </span>

                    Hazard Effect

                </span>


                <span>

                    <span
                        class="sim-dot sim-dot-remover">
                    </span>

                    Effect Remover

                </span>


                <span>

                    <span
                        class="sim-dot sim-dot-processor">
                    </span>

                    Processor

                </span>

            </div>


            <div
                id="sim-status-text"
                class="sim-status">

                Place the hazard effect,
                then place an effect remover.

            </div>

        `;


        /* =================================================
           ELEMENT REFERENCES
        ================================================= */

        const canvas =
            document.getElementById(
                "sim-map-canvas"
            );


        const ctx =
            canvas.getContext("2d");


        const statusText =
            document.getElementById(
                "sim-status-text"
            );


        const effectDropdown =
            document.getElementById(
                "sim-effect-type"
            );


        const hazardButton =
            document.getElementById(
                "sim-hazard-button"
            );


        const removerButton =
            document.getElementById(
                "sim-remover-button"
            );


        const runButton =
            document.getElementById(
                "sim-run-button"
            );


        const resetButton =
            document.getElementById(
                "sim-reset-button"
            );


        /* =================================================
           MAP NODE DATA

           time = travel time FROM this upgrader
                  TO the next upgrader
        ================================================= */

        const mapData = [

            /* ================= TOP LEVEL ================= */

            {
                id: 1,
                label: "T1",
                x: 300,
                y: 70,
                time: 2.0
            },

            {
                id: 2,
                label: "T2",
                x: 150,
                y: 70,
                time: 1.4
            },

            {
                id: 3,
                label: "T3",
                x: 235,
                y: 145,
                time: 2.7
            },

            {
                id: 4,
                label: "T4",
                x: 285,
                y: 275,
                time: 3.1
            },

            {
                id: 5,
                label: "T5",
                x: 440,
                y: 275,
                time: 2.5
            },


            /* ================= BOTTOM LEVEL ================= */

            {
                id: 6,
                label: "B1",
                x: 300,
                y: 725,
                time: 2.4
            },

            {
                id: 7,
                label: "B2",
                x: 300,
                y: 645,
                time: 2.4
            },

            {
                id: 8,
                label: "B3",
                x: 215,
                y: 645,
                time: 2.9
            },

            {
                id: 9,
                label: "B4",
                x: 255,
                y: 575,
                time: 2.9
            },

            {
                id: 10,
                label: "B5",
                x: 405,
                y: 645,
                time: 2.9
            },

            {
                id: 11,
                label: "B6",
                x: 405,
                y: 750,
                time: 2.5
            },

            {
                id: 12,
                label: "B7",
                x: 335,
                y: 830,
                time: 1.7
            },

            {
                id: 13,
                label: "B8",
                x: 270,
                y: 910,
                time: 2.7
            },

            {
                id: 14,
                label: "B9",
                x: 175,
                y: 910,
                time: 2.5
            },

            {
                id: 15,
                label: "B10",
                x: 205,
                y: 820,
                time: 5.1
            },

            {
                id: 16,
                label: "B11",
                x: 105,
                y: 950,
                time: 4.4
            },

            {
                id: 17,
                label: "B12",
                x: 270,
                y: 1025,
                time: 1.3
            },

            {
                id: 18,
                label: "PROCESSOR",
                x: 560,
                y: 1025,
                time: 0
            }

        ];


        /* =================================================
           EXACT CONVEYOR ROUTE
        ================================================= */

        const routeSegments = [

            /* T1 -> T2 */

            {
                from: 1,
                to: 2,

                points: [
                    [300, 70],
                    [150, 70]
                ]
            },


            /* T2 -> T3 */

            {
                from: 2,
                to: 3,

                points: [
                    [150, 70],
                    [150, 145],
                    [235, 145]
                ]
            },


            /* T3 -> T4 */

            {
                from: 3,
                to: 4,

                points: [
                    [235, 145],
                    [285, 145],
                    [285, 275]
                ]
            },


            /* T4 -> T5 */

            {
                from: 4,
                to: 5,

                points: [
                    [285, 275],
                    [285, 345],
                    [440, 345],
                    [440, 275]
                ]
            },


            /* =================================================
               T5 -> B1

               INVISIBLE DROP.

               The line is hidden but it STILL consumes
               the full 2.5 seconds.
            ================================================= */

            {
                from: 5,
                to: 6,

                hidden: true,

                points: [
                    [440, 275],
                    [440, 450],
                    [300, 450],
                    [300, 725]
                ]
            },


            /* B1 -> B2 */

            {
                from: 6,
                to: 7,

                points: [
                    [300, 725],
                    [300, 645]
                ]
            },


            /* B2 -> B3 */

            {
                from: 7,
                to: 8,

                points: [
                    [300, 645],
                    [300, 620],
                    [215, 620],
                    [215, 645]
                ]
            },


            /* B3 -> B4 */

            {
                from: 8,
                to: 9,

                points: [
                    [215, 645],
                    [215, 575],
                    [255, 575]
                ]
            },


            /* B4 -> B5 */

            {
                from: 9,
                to: 10,

                points: [
                    [255, 575],
                    [405, 575],
                    [405, 645]
                ]
            },


            /* B5 -> B6 */

            {
                from: 10,
                to: 11,

                points: [
                    [405, 645],
                    [405, 750]
                ]
            },


            /* B6 -> B7 */

            {
                from: 11,
                to: 12,

                points: [
                    [405, 750],
                    [405, 830],
                    [335, 830]
                ]
            },


            /* B7 -> B8 */

            {
                from: 12,
                to: 13,

                points: [
                    [335, 830],
                    [270, 830],
                    [270, 910]
                ]
            },


            /* B8 -> B9 */

            {
                from: 13,
                to: 14,

                points: [
                    [270, 910],
                    [270, 955],
                    [175, 955],
                    [175, 910]
                ]
            },


            /* B9 -> B10 */

            {
                from: 14,
                to: 15,

                points: [
                    [175, 910],
                    [175, 840],
                    [205, 840],
                    [205, 820]
                ]
            },


            /* B10 -> B11 */

            {
                from: 15,
                to: 16,

                points: [
                    [205, 820],
                    [205, 785],
                    [105, 785],
                    [105, 950]
                ]
            },


            /* B11 -> B12 */

            {
                from: 16,
                to: 17,

                points: [
                    [105, 950],
                    [105, 1025],
                    [270, 1025]
                ]
            },


            /* B12 -> Processor */

            {
                from: 17,
                to: 18,

                points: [
                    [270, 1025],
                    [560, 1025]
                ]
            }

        ];


        /* =================================================
           SIMULATION VARIABLES
        ================================================= */

        let hazardNode =
            null;


        let removerNode =
            null;


        let placementMode =
            "hazard";


        let simTime =
            0;


        let simTimer =
            null;


        let simulationState =
            "idle";


        let finalEventTime =
            0;


        /* =================================================
           GET NODE
        ================================================= */

        function getNode(id) {

            return mapData.find(
                function (node) {

                    return node.id === id;

                }
            );

        }


        /* =================================================
           GET ROUTE FROM SELECTED NODE
        ================================================= */

        function getRouteFromNode(id) {

            const start =
                routeSegments.findIndex(
                    function (segment) {

                        return segment.from === id;

                    }
                );


            if (start === -1) {

                return [];

            }


            return routeSegments.slice(
                start
            );

        }


        /* =================================================
           PLACEMENT MODE
        ================================================= */

        function setPlacementMode(mode) {

            placementMode =
                mode;


            hazardButton
                .classList
                .remove(
                    "sim-active"
                );


            removerButton
                .classList
                .remove(
                    "sim-active"
                );


            if (
                mode === "hazard"
            ) {

                hazardButton
                    .classList
                    .add(
                        "sim-active"
                    );


                statusText.innerHTML =

                    "Click any upgrader to place the " +

                    "<span style='color:#ef4444;'>" +

                    "hazard effect" +

                    "</span>.";

            }

            else {

                removerButton
                    .classList
                    .add(
                        "sim-active"
                    );


                statusText.innerHTML =

                    "Click any upgrader to place the " +

                    "<span style='color:#22d3ee;'>" +

                    "effect remover" +

                    "</span>.";

            }

        }


        /* =================================================
           POLYLINE LENGTH
        ================================================= */

        function polylineLength(points) {

            let length =
                0;


            for (
                let i = 0;
                i < points.length - 1;
                i++
            ) {

                const x1 =
                    points[i][0];


                const y1 =
                    points[i][1];


                const x2 =
                    points[i + 1][0];


                const y2 =
                    points[i + 1][1];


                length +=
                    Math.hypot(
                        x2 - x1,
                        y2 - y1
                    );

            }


            return length;

        }


        /* =================================================
           FIND POSITION ALONG EXACT CONVEYOR
        ================================================= */

        function pointAlongPolyline(
            points,
            progress
        ) {

            const totalLength =
                polylineLength(
                    points
                );


            let wantedDistance =
                totalLength *
                progress;


            for (
                let i = 0;
                i < points.length - 1;
                i++
            ) {

                const x1 =
                    points[i][0];


                const y1 =
                    points[i][1];


                const x2 =
                    points[i + 1][0];


                const y2 =
                    points[i + 1][1];


                const segmentLength =
                    Math.hypot(
                        x2 - x1,
                        y2 - y1
                    );


                if (
                    wantedDistance <=
                    segmentLength
                ) {

                    const ratio =

                        segmentLength === 0

                            ? 0

                            : wantedDistance /
                              segmentLength;


                    return {

                        x:
                            x1 +
                            (x2 - x1) *
                            ratio,

                        y:
                            y1 +
                            (y2 - y1) *
                            ratio,

                        segmentIndex:
                            i

                    };

                }


                wantedDistance -=
                    segmentLength;

            }


            const finalPoint =
                points[
                    points.length - 1
                ];


            return {

                x:
                    finalPoint[0],

                y:
                    finalPoint[1],

                segmentIndex:
                    points.length - 2

            };

        }


        /* =================================================
           TIME FROM HAZARD TO AN UPGRADER
        ================================================= */

        function getTravelTimeToNode(
            startingNode,
            targetNode
        ) {

            if (
                startingNode ===
                targetNode
            ) {

                return 0;

            }


            const route =
                getRouteFromNode(
                    startingNode
                );


            let totalTime =
                0;


            for (
                const segment
                of route
            ) {

                const fromNode =
                    getNode(
                        segment.from
                    );


                totalTime +=
                    fromNode.time;


                if (
                    segment.to ===
                    targetNode
                ) {

                    return totalTime;

                }

            }


            /*
            Remover is not downstream
            from the hazard.
            */

            return Infinity;

        }


        /* =================================================
           TIME TO PROCESSOR
        ================================================= */

        function getTimeToProcessor(
            startingNode
        ) {

            const route =
                getRouteFromNode(
                    startingNode
                );


            let totalTime =
                0;


            for (
                const segment
                of route
            ) {

                const node =
                    getNode(
                        segment.from
                    );


                totalTime +=
                    node.time;

            }


            return totalTime;

        }


        /* =================================================
           DRAW EXPLOSION
        ================================================= */

        function drawExplosion(
            x,
            y
        ) {

            ctx.beginPath();


            ctx.arc(
                x,
                y,
                17,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "#ef4444";


            ctx.fill();


            ctx.font =
                "18px sans-serif";


            ctx.fillStyle =
                "white";


            ctx.fillText(
                "💥",
                x - 11,
                y + 6
            );

        }


        /* =================================================
           DRAW MAP
        ================================================= */

        function drawMap() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            /* ================= LEVEL LABELS ================= */

            ctx.fillStyle =
                "#e2e8f0";


            ctx.font =
                "bold 20px sans-serif";


            ctx.fillText(
                "TOP LEVEL",
                30,
                35
            );


            ctx.fillText(
                "BOTTOM LEVEL",
                30,
                525
            );


            /* ================= CONVEYOR BELTS ================= */

            routeSegments.forEach(
                function (segment) {

                    /*
                    Do not display the
                    T5 -> B1 drop.
                    */

                    if (
                        segment.hidden
                    ) {

                        return;

                    }


                    ctx.beginPath();


                    ctx.strokeStyle =
                        "#3f3f4e";


                    ctx.lineWidth =
                        16;


                    ctx.lineJoin =
                        "round";


                    ctx.lineCap =
                        "round";


                    ctx.setLineDash([]);


                    segment.points.forEach(
                        function (
                            point,
                            index
                        ) {

                            if (
                                index === 0
                            ) {

                                ctx.moveTo(
                                    point[0],
                                    point[1]
                                );

                            }

                            else {

                                ctx.lineTo(
                                    point[0],
                                    point[1]
                                );

                            }

                        }
                    );


                    ctx.stroke();

                }
            );


            /* ================= SIMULATION ================= */

            if (
                hazardNode !== null &&
                simulationState !== "idle"
            ) {

                drawSimulationPath();

            }


            /* ================= UPGRADER NODES ================= */

            mapData.forEach(
                function (node) {

                    ctx.beginPath();


                    ctx.arc(
                        node.x,
                        node.y,
                        12,
                        0,
                        Math.PI * 2
                    );


                    if (
                        node.id === 18
                    ) {

                        ctx.fillStyle =
                            "#44ff44";

                    }

                    else if (
                        node.id ===
                        hazardNode
                    ) {

                        ctx.fillStyle =
                            "#ef4444";

                    }

                    else {

                        ctx.fillStyle =
                            "#5d5dff";

                    }


                    ctx.fill();


                    /* ================= REMOVER RING ================= */

                    if (
                        node.id ===
                        removerNode
                    ) {

                        ctx.beginPath();


                        ctx.arc(
                            node.x,
                            node.y,
                            19,
                            0,
                            Math.PI * 2
                        );


                        ctx.strokeStyle =
                            "#22d3ee";


                        ctx.lineWidth =
                            5;


                        ctx.stroke();

                    }


                    /* ================= NODE LABEL ================= */

                    ctx.fillStyle =
                        "#e2e8f0";


                    ctx.font =
                        "bold 13px sans-serif";


                    ctx.fillText(
                        node.label,
                        node.x - 22,
                        node.y - 20
                    );


                    /* ================= REMOVER LABEL ================= */

                    if (
                        node.id ===
                        removerNode
                    ) {

                        ctx.fillStyle =
                            "#22d3ee";


                        ctx.font =
                            "bold 13px sans-serif";


                        ctx.fillText(
                            "R",
                            node.x + 21,
                            node.y + 5
                        );

                    }

                }
            );


            /* ================= SUCCESS CHECK ================= */

            if (
                simulationState ===
                    "removed" &&
                removerNode !== null
            ) {

                const remover =
                    getNode(
                        removerNode
                    );


                ctx.fillStyle =
                    "#22d3ee";


                ctx.font =
                    "bold 30px sans-serif";


                ctx.fillText(
                    "✓",
                    remover.x - 9,
                    remover.y + 10
                );

            }

        }


        /* =================================================
           DRAW ACTIVE SIMULATION
        ================================================= */

        function drawSimulationPath() {

            const route =
                getRouteFromNode(
                    hazardNode
                );


            if (
                route.length === 0
            ) {

                return;

            }


            let timeRemaining =
                simTime;


            ctx.strokeStyle =
                "#f59e0b";


            ctx.lineWidth =
                6;


            ctx.lineJoin =
                "round";


            ctx.lineCap =
                "round";


            ctx.setLineDash([]);


            for (
                const segment
                of route
            ) {

                const fromNode =
                    getNode(
                        segment.from
                    );


                const segmentTime =
                    fromNode.time;


                /* =========================================
                   INVISIBLE T5 -> B1 DROP

                   Time still counts.
                ========================================= */

                if (
                    segment.hidden
                ) {

                    if (
                        timeRemaining >=
                        segmentTime
                    ) {

                        timeRemaining -=
                            segmentTime;


                        continue;

                    }


                    /*
                    Currently inside invisible
                    transition.

                    Nothing is drawn.
                    */

                    return;

                }


                /* =========================================
                   FULL SEGMENT COMPLETED
                ========================================= */

                if (
                    timeRemaining >=
                    segmentTime
                ) {

                    ctx.beginPath();


                    segment.points.forEach(
                        function (
                            point,
                            index
                        ) {

                            if (
                                index === 0
                            ) {

                                ctx.moveTo(
                                    point[0],
                                    point[1]
                                );

                            }

                            else {

                                ctx.lineTo(
                                    point[0],
                                    point[1]
                                );

                            }

                        }
                    );


                    ctx.stroke();


                    timeRemaining -=
                        segmentTime;


                    /*
                    Explosion exactly
                    on an upgrader.
                    */

                    if (
                        timeRemaining === 0 &&
                        simulationState ===
                            "destroyed"
                    ) {

                        const destination =
                            getNode(
                                segment.to
                            );


                        drawExplosion(
                            destination.x,
                            destination.y
                        );


                        return;

                    }


                    continue;

                }


                /* =========================================
                   PARTIAL SEGMENT
                ========================================= */

                const progress =

                    segmentTime === 0

                        ? 1

                        : timeRemaining /
                          segmentTime;


                const position =
                    pointAlongPolyline(
                        segment.points,
                        progress
                    );


                ctx.beginPath();


                ctx.moveTo(
                    segment.points[0][0],
                    segment.points[0][1]
                );


                for (
                    let i = 1;
                    i <=
                        position.segmentIndex;
                    i++
                ) {

                    ctx.lineTo(
                        segment.points[i][0],
                        segment.points[i][1]
                    );

                }


                ctx.lineTo(
                    position.x,
                    position.y
                );


                ctx.stroke();


                /* =========================================
                   MOVING ORE
                ========================================= */

                if (
                    simulationState ===
                    "running"
                ) {

                    ctx.beginPath();


                    ctx.arc(
                        position.x,
                        position.y,
                        9,
                        0,
                        Math.PI * 2
                    );


                    ctx.fillStyle =
                        "#f59e0b";


                    ctx.fill();

                }


                /* =========================================
                   DESTROYED ORE
                ========================================= */

                else if (
                    simulationState ===
                    "destroyed"
                ) {

                    drawExplosion(
                        position.x,
                        position.y
                    );

                }


                return;

            }

        }


        /* =================================================
           STOP RUNNING SIMULATION
        ================================================= */

        function stopCurrentSimulation() {

            if (
                simTimer
            ) {

                clearInterval(
                    simTimer
                );


                simTimer =
                    null;

            }


            simTime =
                0;


            simulationState =
                "idle";

        }


        /* =================================================
           RUN SIMULATION
        ================================================= */

        function runSimulation() {

            /* ================= NO HAZARD ================= */

            if (
                hazardNode === null
            ) {

                statusText.innerHTML =

                    "<span style='color:#ef4444;'>" +

                    "Please place the hazard effect first." +

                    "</span>";


                return;

            }


            if (
                simTimer
            ) {

                clearInterval(
                    simTimer
                );


                simTimer =
                    null;

            }


            const maxEffectTime =
                parseFloat(
                    effectDropdown.value
                );


            const effectName =

                effectDropdown
                    .options[
                        effectDropdown
                            .selectedIndex
                    ]
                    .text
                    .split(" ")[0];


            /* ================= PROCESSOR TIME ================= */

            const processorTime =
                getTimeToProcessor(
                    hazardNode
                );


            /* ================= REMOVER TIME ================= */

            let removerTime =
                Infinity;


            if (
                removerNode !== null
            ) {

                removerTime =
                    getTravelTimeToNode(
                        hazardNode,
                        removerNode
                    );

            }


            /* =================================================
               DETERMINE WHAT HAPPENS FIRST
            ================================================= */

            let finalState;


            /*
            Ore reaches processor first.
            */

            if (
                processorTime <=
                    maxEffectTime &&

                processorTime <
                    removerTime
            ) {

                finalState =
                    "processor";


                finalEventTime =
                    processorTime;

            }


            /*
            Ore reaches remover on time.

            Exactly equal to destruction time
            counts as successful removal.
            */

            else if (
                removerTime <=
                    maxEffectTime &&

                removerTime <=
                    processorTime
            ) {

                finalState =
                    "removed";


                finalEventTime =
                    removerTime;

            }


            /*
            Hazard expires first.
            */

            else {

                finalState =
                    "destroyed";


                finalEventTime =
                    maxEffectTime;

            }


            /* =================================================
               REMOVER ON SAME UPGRADER
            ================================================= */

            if (
                finalEventTime === 0
            ) {

                simTime =
                    0;


                simulationState =
                    finalState;


                drawMap();


                if (
                    finalState ===
                    "removed"
                ) {

                    const remover =
                        getNode(
                            removerNode
                        );


                    statusText.innerHTML =

                        "<span style='color:#22d3ee;'>" +

                        "🛡️ EFFECT REMOVED! " +

                        "The effect remover at <b>" +

                        remover.label +

                        "</b> removed " +

                        effectName +

                        " immediately. " +

                        "<b>The ore does not get destroyed.</b>" +

                        "</span>";

                }


                return;

            }


            /* =================================================
               START ANIMATION
            ================================================= */

            simTime =
                0;


            simulationState =
                "running";


            statusText.innerHTML =
                "Simulation running...";


            simTimer =
                setInterval(
                    function () {

                        simTime =
                            Math.min(
                                simTime + 0.2,
                                finalEventTime
                            );


                        drawMap();


                        if (
                            simTime >=
                            finalEventTime
                        ) {

                            clearInterval(
                                simTimer
                            );


                            simTimer =
                                null;


                            simulationState =
                                finalState;


                            drawMap();


                            /* =================================
                               REMOVER SUCCESS
                            ================================= */

                            if (
                                finalState ===
                                "removed"
                            ) {

                                const remover =
                                    getNode(
                                        removerNode
                                    );


                                statusText.innerHTML =

                                    "<span style='color:#22d3ee;'>" +

                                    "🛡️ EFFECT REMOVED! " +

                                    "The ore reached the effect remover at " +

                                    "<b>" +

                                    remover.label +

                                    "</b> in " +

                                    "<b>" +

                                    removerTime.toFixed(1) +

                                    "s</b>. " +

                                    effectName +

                                    " would destroy it after " +

                                    maxEffectTime.toFixed(1) +

                                    "s. " +

                                    "<b>The ore does not get destroyed.</b>" +

                                    "</span>";

                            }


                            /* =================================
                               PROCESSOR SURVIVAL
                            ================================= */

                            else if (
                                finalState ===
                                "processor"
                            ) {

                                statusText.innerHTML =

                                    "<span style='color:#44ff44;'>" +

                                    "✅ ORE SURVIVED! " +

                                    "It reached the Processor in " +

                                    "<b>" +

                                    processorTime.toFixed(1) +

                                    "s</b> before " +

                                    effectName +

                                    " could destroy it." +

                                    "</span>";

                            }


                            /* =================================
                               DESTROYED
                            ================================= */

                            else {

                                let extraMessage =
                                    "";


                                if (
                                    removerNode !==
                                    null
                                ) {

                                    if (
                                        removerTime ===
                                        Infinity
                                    ) {

                                        extraMessage =

                                            " The effect remover is not after the hazard on the conveyor path.";

                                    }

                                    else {

                                        extraMessage =

                                            " The effect remover would only be reached after " +

                                            removerTime.toFixed(1) +

                                            "s.";

                                    }

                                }


                                statusText.innerHTML =

                                    "<span style='color:#ef4444;'>" +

                                    "💥 DESTROYED! " +

                                    effectName +

                                    " destroyed the ore after " +

                                    "<b>" +

                                    maxEffectTime.toFixed(1) +

                                    "s</b>." +

                                    extraMessage +

                                    "</span>";

                            }

                        }

                    },

                    20
                );

        }


        /* =================================================
           RESET
        ================================================= */

        function resetSimulation() {

            if (
                simTimer
            ) {

                clearInterval(
                    simTimer
                );


                simTimer =
                    null;

            }


            hazardNode =
                null;


            removerNode =
                null;


            simTime =
                0;


            finalEventTime =
                0;


            simulationState =
                "idle";


            placementMode =
                "hazard";


            hazardButton
                .classList
                .add(
                    "sim-active"
                );


            removerButton
                .classList
                .remove(
                    "sim-active"
                );


            statusText.innerHTML =
                "Place the hazard effect, then place an effect remover.";


            drawMap();

        }


        /* =================================================
           CLICK UPGRADER
        ================================================= */

        canvas.addEventListener(
            "click",

            function (event) {

                const rect =
                    canvas
                        .getBoundingClientRect();


                /*
                Correct mouse position when
                Fandom scales the canvas.
                */

                const scaleX =
                    canvas.width /
                    rect.width;


                const scaleY =
                    canvas.height /
                    rect.height;


                const clickX =

                    (
                        event.clientX -
                        rect.left
                    ) *

                    scaleX;


                const clickY =

                    (
                        event.clientY -
                        rect.top
                    ) *

                    scaleY;


                for (
                    const node
                    of mapData
                ) {

                    const distance =
                        Math.hypot(

                            node.x -
                            clickX,

                            node.y -
                            clickY

                        );


                    /*
                    Processor cannot contain
                    a hazard or remover.
                    */

                    if (
                        distance < 25 &&
                        node.id !== 18
                    ) {

                        stopCurrentSimulation();


                        /* ================= HAZARD ================= */

                        if (
                            placementMode ===
                            "hazard"
                        ) {

                            hazardNode =
                                node.id;


                            statusText.innerHTML =

                                "Hazard effect placed at " +

                                "<b style='color:#ef4444;'>" +

                                node.label +

                                "</b>. " +

                                "Place an effect remover or run the simulation.";

                        }


                        /* ================= REMOVER ================= */

                        else {

                            removerNode =
                                node.id;


                            statusText.innerHTML =

                                "Effect remover placed at " +

                                "<b style='color:#22d3ee;'>" +

                                node.label +

                                "</b>. " +

                                "Press <b>Run Simulation</b>.";

                        }


                        drawMap();


                        break;

                    }

                }

            }
        );


        /* =================================================
           BUTTON EVENTS
        ================================================= */

        hazardButton.addEventListener(
            "click",

            function () {

                setPlacementMode(
                    "hazard"
                );

            }
        );


        removerButton.addEventListener(
            "click",

            function () {

                setPlacementMode(
                    "remover"
                );

            }
        );


        runButton.addEventListener(
            "click",

            function () {

                runSimulation();

            }
        );


        resetButton.addEventListener(
            "click",

            function () {

                resetSimulation();

            }
        );


        /* =================================================
           EFFECT DROPDOWN
        ================================================= */

        effectDropdown.addEventListener(
            "change",

            function () {

                if (
                    simTimer
                ) {

                    clearInterval(
                        simTimer
                    );


                    simTimer =
                        null;

                }


                simTime =
                    0;


                simulationState =
                    "idle";


                statusText.innerHTML =

                    "Hazard changed. Press <b>Run Simulation</b> when ready.";


                drawMap();

            }
        );


        /* =================================================
           FIRST DRAW
        ================================================= */

        drawMap();

    });

})();