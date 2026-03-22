const timeInstances = document.querySelectorAll(".time-switch");

function to12Clock(content)
{
    const timeElements = content.split(":");
    let hour = parseInt(timeElements[0], 10) % 12;
    const minute = timeElements[1].slice(0, 2);
    let second = "00";
    let suffix = "AM";

    if (hour == 0) hour = 12;
    if (timeElements[2]) second = timeElements[2].slice(0,2);
    if (parseInt(timeElements[0]) >= 12) suffix = "PM";

    if (timeElements.length >= 3)
    return `${hour}:${minute}:${second} ${suffix}`;

    return `${hour}:${minute} ${suffix}`;
}

function to24Clock(content)
{
    const timeElements = content.split(":");
    let hour = parseInt(timeElements[0]);
    const minute = timeElements[1].slice(0, 2);
    let second = "00";
    let suffix = "AM";

    if (timeElements[2]) second = timeElements[2].slice(0,2);
    if (content.endsWith("PM")) suffix = "PM";
    if (suffix == "PM" && hour != 12) hour += 12;
    if (suffix == "AM" && hour == 12) hour = "00";

    if (timeElements.length >= 3)
    return `${hour}:${minute}:${second}`;

    return `${hour}:${minute}`;
}

function is24Clock(content)
{
    if (content.endsWith("M"))
    return false;

    return true;
}

document.addEventListener('click', function(e)
{
    if (!e.target.closest('.time-switch')) return;

    timeInstances.forEach(timeInstance =>
    {
        if (is24Clock(timeInstance.textContent))
            timeInstance.textContent = to12Clock(timeInstance.textContent);
        else
            timeInstance.textContent = to24Clock(timeInstance.textContent);
    });
});