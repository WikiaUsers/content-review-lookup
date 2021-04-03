@Override
 public void onArmorTick(World world, EntityPlayer player, ItemStack itemStack) {
  if (itemStack.getItem().equals(ModArmour.tinBoots)) {

    if(Keyboard.isKeyDown(Keyboard.KEY_SPACE) &&
      (player.isAirBorne) &&
      player.motionY < 0.01) {
      player.addVelocity(0, 0.5, 0);
       if (player.motionY < 0.5) {
        player.addVelocity(0, -0.5, 0);
       }
      }
     }
    }