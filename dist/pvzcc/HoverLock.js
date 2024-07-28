<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hover Lock Example</title>
    <style>
        .hover-lock {
            position: relative;
            display: inline-block;
            padding: 10px;
            background-color: #ccc;
            cursor: pointer;
        }

        .hover-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            padding: 10px;
            background-color: #eee;
            border: 1px solid #ccc;
        }

        .hover-lock.active .hover-content {
            display: block;
        }
    </style>
</head>
<body>

<div class="hover-lock" id="hoverLock">
    Hover over me
    <div class="hover-content">
        Content shown on hover and locked after hover.
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const hoverLockElement = document.getElementById('hoverLock');
        let isLocked = false;

        hoverLockElement.addEventListener('mouseenter', function () {
            if (!isLocked) {
                hoverLockElement.classList.add('active');
            }
        });

        hoverLockElement.addEventListener('mouseleave', function () {
            if (!isLocked) {
                hoverLockElement.classList.remove('active');
            }
        });

        hoverLockElement.addEventListener('click', function () {
            isLocked = true;
        });
    });
</script>
</body>
</html>