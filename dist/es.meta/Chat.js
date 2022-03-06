var customMessage = {
    message: '$1 mensajes nuevos'
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:BlinkingTabAlert.js',
        'u:dev:MediaWiki:Pings.js',
    ]
});

// Replace the dark logo with the light version - https://github.com/Wikia/design-system/blob/master/dist/svg/wds-company-logo-fandom-white.svg
$('.wordmark img').attr("src", "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTY0IDM1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9z%0D%0AdmciPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTMyLjAwMyAx%0D%0ANi41MjRjMCAuMjg4LS4xMTUuNTY0LS4zMi43NjhMMTguMyAzMC43MTJjLS4yMjYuMjI0LS40NTQu%0D%0AMzI0LS43MzguMzI0LS4yOTIgMC0uNTUtLjExLS43Ny0uMzI1bC0uOTQzLS44ODZhLjQxLjQxIDAg%0D%0AMCAxLS4wMS0uNTlsMTUuNDUtMTUuNDZjLjI2Mi0uMjYzLjcxNi0uMDc4LjcxNi4yOXYyLjQ2em0t%0D%0AMTcuMTY3IDEwLjEybC0uNzY2LjY4NWEuNjQyLjY0MiAwIDAgMS0uODcyLS4wMkwzLjAxIDE3LjM2%0D%0AMmMtLjI1Ny0uMjUtLjQtLjU5My0uNC0uOTV2LTEuODU4YzAtLjY3LjgxNi0xLjAwNyAxLjI5OC0u%0D%0ANTM2bDEwLjgxNCAxMC41NmMuMTg4LjE4Ny41MDUuNTcuNTA1IDEuMDMzIDAgLjI5Ni0uMDY4Ljcx%0D%0ANS0uMzkgMS4wMzV6TTUuNzMgNy4zOTVMOS4yMzYgMy45M2EuNDIxLjQyMSAwIDAgMSAuNTkyIDBs%0D%0AMTEuNzM2IDExLjYwM2EzLjE1OCAzLjE1OCAwIDAgMSAwIDQuNWwtMy41MDMgMy40NjJhLjQyMy40%0D%0AMjMgMCAwIDEtLjU5IDBMNS43MzIgMTEuODlhMy4xMzIgMy4xMzIgMCAwIDEtLjkzNy0yLjI1YzAt%0D%0ALjg1LjMzMi0xLjY1LjkzNS0yLjI0NnptMTMuODkgMS45ODJsMy42NjItMy42MmEzLjIzMiAzLjIz%0D%0AMiAwIDAgMSAyLjczNy0uODk3Yy43MjIuMDk4IDEuMzc4LjQ3IDEuODkzLjk3OGwzLjcwOCAzLjY2%0D%0AN2EuNDEuNDEgMCAwIDEgMCAuNTg1bC01LjY0IDUuNTc2YS40MTkuNDE5IDAgMCAxLS41OSAwbC01%0D%0ALjc3LTUuNzA0YS40MTEuNDExIDAgMCAxIDAtLjU4NXptMTQuNTYtLjY4N0wyNi4wMTQuNDc1YS44%0D%0ANjkuODY5IDAgMCAwLTEuMjI4LS4wMDJMMTguMzA3IDYuOTRjLS41LjUtMS4zMTYuNS0xLjgyLjAw%0D%0ANGwtNi40OC02LjRBLjg3Ljg3IDAgMCAwIDguNzkzLjU0MkwuNDQ3IDguNjdDLjE2IDguOTUgMCA5%0D%0ALjMzIDAgOS43Mjd2Ny43YzAgLjM5Mi4xNTguNzcuNDQgMS4wNDhsMTYuMjYzIDE2LjA3MmEuODcu%0D%0AODcgMCAwIDAgMS4yMiAwbDE2LjI1LTE2LjA3M2MuMjgtLjI3OC40MzgtLjY1NS40MzgtMS4wNDhW%0D%0AOS43M2MwLS4zOS0uMTUzLS43NjMtLjQzLTEuMDR6IiBmaWxsPSIjMDBENkQ2Ii8+PHBhdGggZD0i%0D%0ATTYyLjg1MiAyMC41MWwyLjU4LTYuNzE2YS40NjguNDY4IDAgMCAxIC44NyAwbDIuNTggNi43MTdo%0D%0ALTYuMDN6bTUuODU2LTEyLjQyOGMtLjE4NC0uNDgtLjY1LS44LTEuMTctLjhoLTMuMzQyYy0uNTIg%0D%0AMC0uOTg2LjMyLTEuMTcuOGwtNy4wODMgMTguNWMtLjIxLjU1Mi4yIDEuMTQuNzk2IDEuMTRoMi43%0D%0ANTNjLjM1MyAwIC42Ny0uMjE1Ljc5Ni0uNTQybC43MzgtMS45MjJhLjg0OS44NDkgMCAwIDEgLjc5%0D%0ANS0uNTQyaDguMDg4YS44NS44NSAwIDAgMSAuNzk2LjU0MmwuNzQgMS45MjJjLjEyNS4zMjcuNDQu%0D%0ANTQzLjc5NS41NDNoMi43NTRhLjg0My44NDMgMCAwIDAgLjc5Ni0xLjE0bC03LjA4Mi0xOC41em05%0D%0AMy41MDQtLjhoLTIuNzE1YTEuODYgMS44NiAwIDAgMC0xLjY3NyAxLjA0N2wtNS4zOTMgMTEuMTYy%0D%0ALTUuMzkzLTExLjE2M2ExLjg1OCAxLjg1OCAwIDAgMC0xLjY3Ny0xLjA0N2gtMi43MTVhLjg4OS44%0D%0AODkgMCAwIDAtLjg5My44ODNWMjYuODRjMCAuNDg3LjQuODgzLjg5Mi44ODNoMi42MDhhLjg4OS44%0D%0AODkgMCAwIDAgLjg5My0uODgzdi05LjY4Nmw0Ljk0NSAxMC4wNzJjLjE1LjMwNC40Ni40OTcuODAz%0D%0ALjQ5N2gxLjA3M2EuODkzLjg5MyAwIDAgMCAuODAzLS40OTdsNC45NDUtMTAuMDcydjkuNjg2YzAg%0D%0ALjQ4Ny40Ljg4My44OTQuODgzaDIuNjA4YS44ODkuODg5IDAgMCAwIC44OTMtLjg4M1Y4LjE2NmMw%0D%0ALS40ODctLjQtLjg4My0uODkzLS44ODN6bS0xMDYuOTcyIDguOGgtOC42M1YxMS40OWgxMC45MThh%0D%0ALjg4Ljg4IDAgMCAwIC44My0uNTc4bC44ODgtMi40NjRhLjg3Mi44NzIgMCAwIDAtLjgzLTEuMTYz%0D%0AaC0xNS4xOGMtLjQ4NiAwLS44OC4zOS0uODguODd2MTguN2MwIC40OC4zOTQuODcuODguODdoMi40%0D%0AOTJjLjQ4NiAwIC44OC0uMzkuODgtLjg3VjIwLjI5aDcuNzQzYS44OC44OCAwIDAgMCAuODMtLjU3%0D%0AOGwuODktMi40NjRhLjg3Mi44NzIgMCAwIDAtLjgzLTEuMTYzem01MS43NiA3LjYxaC0zLjYxNVYx%0D%0AMS4zMTVIMTA3YzMuODI4IDAgNi40MSAyLjUxNyA2LjQxIDYuMTg4IDAgMy42NzItMi41ODIgNi4x%0D%0AOS02LjQxIDYuMTl6bS0uMTI0LTE2LjQxaC03LjEyOGMtLjQ4NiAwLS44OC4zOS0uODguODcydjE4%0D%0ALjY5OGMwIC40OC4zOTQuODcuODguODdoNy4xMjhjNi40NTMgMCAxMC45MTItNC40NCAxMC45MTIt%0D%0AMTAuMTZ2LS4xMTdjMC01LjcyLTQuNDYtMTAuMTYyLTEwLjkxMi0xMC4xNjJ6bS0xMS45NDcuMDNo%0D%0ALTIuNjQyYS44Ny44NyAwIDAgMC0uODc2Ljg2NnYxMi4zNmwtOC43NTUtMTIuNzJhMS4yNDIgMS4y%0D%0ANDIgMCAwIDAtMS4wMjMtLjUzNUg3OC4zMmEuODczLjg3MyAwIDAgMC0uODc2Ljg2N3YxOC43MDZj%0D%0AMCAuNDguMzkzLjg2Ny44NzcuODY3aDIuNjRhLjg3Mi44NzIgMCAwIDAgLjg3OC0uODY3VjE0Ljcx%0D%0AbDguNjA4IDEyLjQ3OGMuMjMuMzM0LjYxMy41MzUgMS4wMjIuNTM1aDMuNDZhLjg3Mi44NzIgMCAw%0D%0AIDAgLjg3Ny0uODY3VjguMTc4YS44Ny44NyAwIDAgMC0uODc2LS44Njd6bTQwLjcxIDEwLjNjMCAz%0D%0ALjMyMy0yLjcxMiA2LjAxNi02LjA1NiA2LjAxNi0zLjM0NSAwLTYuMDU2LTIuNjkzLTYuMDU2LTYu%0D%0AMDE1di0uMjJjMC0zLjMyMiAyLjcxLTYuMDE1IDYuMDU2LTYuMDE1IDMuMzQ0IDAgNi4wNTUgMi42%0D%0AOTMgNi4wNTUgNi4wMTV2LjIyem0tNi4wNTYtMTAuNDRjLTUuNjk0IDAtMTAuMzEgNC41NzYtMTAu%0D%0AMzEgMTAuMjJ2LjIyYzAgNS42NDYgNC42MTYgMTAuMjIgMTAuMzEgMTAuMjIgNS42OTMgMCAxMC4z%0D%0AMDgtNC41NzQgMTAuMzA4LTEwLjIydi0uMjJjMC01LjY0NC00LjYxNS0xMC4yMi0xMC4zMDgtMTAu%0D%0AMjJ6IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==");