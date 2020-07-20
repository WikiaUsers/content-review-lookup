/**
 * Character Template Stat Switching
 * By Starport592
 *
 * Meant to enable the Character template to switch between Glass, Drizzle, and Normal modes.
 */
 
$(document).ready(function(){
var drizzle = false, 
    artifact = false;
 
function resetHPBar()
{
    $(".DrizzleHPBar").css("display","none");
    $(".RainstormMonsoonHPBar").css("display","none");
    $(".GlassDrizzleHPBar").css("display","none");
    $(".GlassRainstormMonsoonHPBar").css("display","none");
}
 
function setDrizzle(state)
{
 
    $(".DrizzleOff").css("display","none");
    $(".DrizzleOn").css("display","none");
    $(".DrizzleRegen").css("display","none");
    $(".HealthRegen").css("display","none");
    resetHPBar();
 
    if (state)
    {
        drizzle = true;
        $(".DrizzleOn").css("display","inline-block");
        $(".DrizzleRegen").css("display","inline-block");
        if (artifact)
        {
            $(".GlassDrizzleHPBar").css("display","inline-block");
        }
        else
        {
            $(".DrizzleHPBar").css("display","inline-block");
        }
    }
    else
    {
        drizzle = false;
        $(".DrizzleOff").css("display","inline-block");
        $(".HealthRegen").css("display","inline-block");
        if (artifact)
        {
            $(".GlassRainstormMonsoonHPBar").css("display","inline-block");
        }
        else
        {
            $(".RainstormMonsoonHPBar").css("display","inline-block");
        }
    }
}
 
function setArtifact(state)
{
 
    $(".ArtifactOff").css("display","none");
    $(".ArtifactOn").css("display","none");
    $(".GlassDamage").css("display","none");
    $(".BaseDamage").css("display","none");
    resetHPBar();
 
    if (state)
    {
        artifact = true;
        $(".ArtifactOn").css("display","inline-block");
        $(".GlassDamage").css("display","inline-block");
        if (drizzle)
        {
            $(".GlassDrizzleHPBar").css("display","inline-block");
        }
        else
        {
            $(".GlassRainstormMonsoonHPBar").css("display","inline-block");
        }
    }
    else
    {
        artifact = false;
        $(".ArtifactOff").css("display","inline-block");
        $(".BaseDamage").css("display","inline-block");
        if (drizzle)
        {
            $(".DrizzleHPBar").css("display","inline-block");
        }
        else
        {
            $(".RainstormMonsoonHPBar").css("display","inline-block");
        }
    }
}
 
  $(".DrizzleOff").click(function()
    {
    setDrizzle(true);
  });
  $(".DrizzleOn").click(function()
    {
    setDrizzle(false);
  });
  $(".ArtifactOff").click(function(){
    setArtifact(true);
  });
  $(".ArtifactOn").click(function(){
    setArtifact(false);
  });
});