$(document).ready(function(){
	$(".state-control").click(function () {
		// Deactivate current state
		const stateContainer = $(this).closest(".state-container");
		const states = stateContainer.find(".state-container__state");
		const activeState = stateContainer.find(".state-container__state--active")
			.removeClass("state-container__state--active")
			.first();
		
		// Activate next state	
		const forward = $(this).hasClass("state-control-forward");
		const index = states.index(activeState) + (forward ? 1 : -1);
		states.eq(index).addClass("state-container__state--active");
		
		
		// Disable back button only if at first state, forward button only if at last state
		stateContainer.find(".state-control").removeClass("state-control--disabled")
		if (index === 0) {
			const backButton = stateContainer.find(".state-control-back");
			backButton.addClass("state-control--disabled");
		}
		if (index == states.length - 1) {
			const forwardButton = stateContainer.find(".state-control-forward");
			forwardButton.addClass("state-control--disabled");
		}
  });
})