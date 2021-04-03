‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
CLOUD-JUMP (Cloud Chestplate Effect):
__________________________________________________________________________
    
    @Override
	public void onArmorTick(World worldIn, EntityPlayer playerIn, ItemStack stack)
	{
		if (worldIn.isRemote && Minecraft.getMinecraft().gameSettings.keyBindJump.isKeyDown() 
				&& playerIn.motionY < 0.38D)
		{
			if (playerIn.motionY > 0.0D)
			{
				playerIn.motionY *= 1.2D;
			}
			else
			{
			    DinocraftServer.spawnCloudParticles();
			    playerIn.motionY *= 0.85D;
			}
			
			DinocraftServer.cancelPlayerFallDamage();
		}
	}

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
SLOWFALL (Umbrella Hat Effect):
__________________________________________________________________________

    @Override
	public void onArmorTick(World worldIn, EntityPlayer playerIn, ItemStack stack)
	{
		if (playerIn.motionY < 0.0F)
		{
			playerIn.motionY *= 0.625F;
		}
		
		playerIn.fallDistance = 0.0F;
	}

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
DOUBLE-JUMP (Leafy Boots Effect):
__________________________________________________________________________

    public int c;
	public int a;
	public int f;
 
    @Override
    public void onArmorTick(World w, EntityPlayer p, ItemStack i) {
        if (p.isInWater() || p.isInLava() || p.capabilities.isCreativeMode || p.isOnLadder() || p.isDead || p.isElytraFlying() || p.onGround) {
            c = 1;
            a = 0;
            f = 1;
        } else if (p.isAirBorne) {
            if (!Minecraft.getMinecraft().gameSettings.keyBindJump.isKeyDown() && a == 0) {
                c = 0;
                a = 1;
                f = 1;
            }
            if (Minecraft.getMinecraft().gameSettings.keyBindJump.isKeyDown() && c == 0 && a == 1) {
                c = 1;
                a = 1;
                f = 0;
                if (p.isSprinting()) {
                    p.jumpMovementFactor = (float) -0.25;
                    p.jump();
                } else {
                    p.jump();
                }
                p.playSound(SoundEvents.ENTITY_ENDERDRAGON_FLAP, 1F, 1);
                Random r = new Random();
                for (int cp = 0; cp <= 5; ++cp) {
                    w.spawnParticle(EnumParticleTypes.CLOUD, p.posX + (r.nextDouble() - 0.5D) * (double)p.width, p.posY + r.nextDouble() - (double)p.getYOffset() - 1D, p.posZ + (r.nextDouble() - 0.5D) * (double)p.width, 0, 0, 0, 1);
                    w.spawnParticle(EnumParticleTypes.CLOUD, p.posX + (r.nextDouble() - 1D) * (double)p.width, p.posY + r.nextDouble() - (double)p.getYOffset() - 1D, p.posZ + (r.nextDouble() - 1D) * (double)p.width, 0, 0, 0, 1);
                }
            }
        }
        if (f == 0) {
            p.fallDistance = 0;
        }
    }








    @Override
    public void onArmorTick(World w, EntityPlayer p, ItemStack s) {
		DinocraftPlayer d = DinocraftPlayer.getPlayer(p);
		if (d != null && p != null && w != null && s != null) {			
			if (w.isRemote && !p.capabilities.isFlying && !p.isCreative() && !p.isSpectator()) {
				if (p.onGround || !p.isAirBorne || p.isInWater() || p.isInLava()) {	
					d.setHasDoubleJumped(true);
    				d.setCooldown(false);
				}
				if (p.isAirBorne && !p.onGround) {
					boolean j = Minecraft.getMinecraft().gameSettings.keyBindJump.isKeyDown();
					if (!j && !d.getCooldown()) {	
						d.setHasDoubleJumped(false);
						d.setCooldown(true);
					}
					if (j && !d.hasDoubleJumped()) {
						d.setHasDoubleJumped(true);
						d.setHasNoFallDamage(true);
						DinocraftServer.setPlayerCapability(Capability.DOUBLE_JUMP_PHASE, true);
						PotionEffect e = p.getActivePotionEffect(MobEffects.JUMP_BOOST);
						if (e != null) {
							int a = e.getAmplifier();
							p.motionY = (a * 0.1125D) + 0.5625D;
						} else {
							p.motionY = 0.475D;
						}
						p.playSound(SoundEvents.ENTITY_ENDERDRAGON_FLAP, 1.0F, 1.125F);
						p.motionX *= 1.095D;        
						p.motionZ *= 1.095D;
					}
				}
			}
			if (!w.isRemote) {
				if (d.inDoubleJumpPhase()) {
					PotionEffect e = p.getActivePotionEffect(MobEffects.JUMP_BOOST);
					Random r = new Random();
					for (int i = 0; i < 16; ++i) {							                        DinocraftServer.spawnParticle(EnumParticleTypes.CLOUD, w, p.posX + (r.nextDouble() * 2D) - 1D, p.posY + (r.nextDouble() * 0.25D), p.posZ + (r.nextDouble() * 2D) - 1D, 0.0D, r.nextDouble() * 0.03D, 0.0D, 1);
					}
					if (e != null) {
						if (!p.hasAchievement(DinocraftAchievements.DOUBLE_JUMPIN_JUMP)) {
							p.addStat(DinocraftAchievements.DOUBLE_JUMPIN_JUMP);
						}
					} else {
						if (!p.hasAchievement(DinocraftAchievements.ONE_JUMP_FURTHER)) {
						    p.addStat(DinocraftAchievements.ONE_JUMP_FURTHER);
						}
					}
					if (s.getItemDamage() != s.getMaxDamage() - 1) {
						s.damageItem(1, p);
					} else {
						p.inventory.deleteStack(s);
					}
					d.setHasNoFallDamage(true);
					d.setDoubleJumpPhase(false);
				}
			}
		}
	}

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
LONG-JUMP (Sheeplite Armour Set Effect):
__________________________________________________________________________

    @Override
    public void onArmorTick(World worldIn, EntityPlayer playerIn, ItemStack stack)
    {
		DinocraftPlayer dinoPlayer = DinocraftPlayer.getPlayer(playerIn);
				
		if (playerIn != null && worldIn != null && dinoPlayer != null && stack != null)
		{		
			if (worldIn.isRemote && dinoPlayer.isWearingArmorSet(
					DinocraftArmour.SHEEPLITE_HELMET, DinocraftArmour.SHEEPLITE_CHESTPLATE, 
					DinocraftArmour.SHEEPLITE_LEGGINGS, DinocraftArmour.SHEEPLITE_BOOTS)) //Client-side code block
			{
				if (stack.getItem() == DinocraftArmour.SHEEPLITE_CHESTPLATE)
				{
					boolean isJumping = Minecraft.getMinecraft().gameSettings.keyBindJump.isKeyDown();

					if (playerIn.onGround || !playerIn.isAirBorne)
					{	
						if (!isJumping && !playerIn.isSneaking())
						{
							dinoPlayer.setJumpCooldown(true);
						}
					}
					
					if (dinoPlayer.getJumpCooldown() && isJumping && playerIn.isSneaking())
					{
						playerIn.motionY = 1.0D;
						
						dinoPlayer.setJumpCooldown(false);
						dinoPlayer.setHasNoFallDamage(true);
						DinocraftServer.setPlayerCapability(Capability.NO_FALL_DAMAGE, true);
					}
				}
			}
		}
    }

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
LAUNCH (Chlorophyte Sword Effect):
__________________________________________________________________________

    @Override
	public boolean hitEntity(ItemStack stack, EntityLivingBase target, EntityLivingBase attacker)
	{
		if (attacker.isSneaking())
		{
			if (target.hurtTime == target.maxHurtTime && target.deathTime <= 0)
			{
				target.addVelocity(0D, 0.5D, 0D)
			}
		}
		
        return super.hitEntity(stack, target, attacker);
	}

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
HEARTY GIFT (Chlorophyte Armour Set Effect):
__________________________________________________________________________

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
KNOCKBACK ON HIT (Without Knockback Enchantment):
__________________________________________________________________________

    @Override
    public boolean hitEntity(ItemStack stack, EntityLivingBase target, EntityLivingBase attacker)
    {
       	stack.damageItem(1, attacker);
       	
       	if (target.hurtTime == target.maxHurtTime && target.deathTime <= 0)
       	{
       	    double d = target.posX - attacker.posX;
		    double d1;
		    
	    	for (d1 = target.posZ - attacker.posZ; d * d + d1 * d1 < 0.0001D; d1 = (Math.random() - Math.random()) * 0.01D)
	    	{
	    		d = (Math.random() - Math.random()) * 0.01D;
    		}
    		
    		float f = MathHelper.sqrt_double(d * d + d1 * d1);
        	float f1 = 0.4F;
        	
        	target.isAirBorne = true;
    	    target.motionX /= 2D;
        	target.motionY /= 2D;
        	target.motionZ /= 2D;
        	target.motionX += (d / (double)f) * (double)f1 * 2;
	    	target.motionY += 0.40000000596046448D;
	    	target.motionZ += (d1 / (double)f) * (double)f1 * 2;
	    	
	    	if (target.motionY > 0.40000000596046448D)
	    	{
		    	target.motionY = 0.40000000596046448D;
		    }
       	}
       	
        return super.hitEntity(stack, target, attacker);
	}

2. Make achievements.
    I. Useful Junk?! pre Pebbles
        Obtain Cracked Pebbles from a Pebbles Block.
    II. ACTUAL Junk???!!! pre Useful Junk
        Mine a Block of Pure Poison.



    public void onEntityCollidedWithBlock(World world, int i, int j, int k, Entity entity)
    {
        entity.attackEntityFrom(DamageSource.cactus, 1);
    }

















‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Code Formatting Rules
__________________________________________________________________________

1. "if", "for", "while", "catch", "try", etc. with brackets will be separated one line from all other code lines.

    Ex. 
    DinocraftPlayer player = DinocraftPlayer.getPlayer(playerIn);
    
    if (player != null)
    {
        player.setFallDamage(false);
    }
    
    playerIn.playSound(SoundEvents.BLOCK_CLOTH_BREAK, 1.0F, 1.0F);
    
2. a. All functions and methods that pertain to the variable (the variable is present withing the method somewhere) being initialized must be grouped with the variable initialization.

    Ex.
    ItemStack stack = playerIn.getStackFromSlot(EntityEquipmentSlot.FEET);
    stack.damageItem(1, playerIn);
        
    DinocraftPlayer player = DinocraftPlayer.getPlayer(playerIn);
    player.setFallDamage(false);
        
    World worldIn = playerIn.worldObj;
	worldIn.playSound((EntityPlayer) null, playerIn.getPosition(), SoundEvents.BLOCK_CLOTH_BREAK, SoundCategory.BLOCKS, 1.0F, 1.0F);

b. If an init. is needed for another init., they must be grouped together. The last init. may then carry out its methods as long as there is no method that pertains to the first init. in between.
        		
	Ex.
	EntityPlayer playerIn = this.getEntityPlayer();
	Vec3d posVec = new Vec3d(playerIn.posX, playerIn.posY + playerIn.getEyeHeight(), playerIn.posZ);
	Vec3d lookVec = playerIn.getLookVec();
	World worldIn = playerIn.worldObj;
	RayTraceResult trace = worldIn.rayTraceBlocks(posVec, posVec.add(lookVec.scale(100.0D)));
	BlockPos pos = trace.getBlockPos();
 	worldIn.setBlockToAir(pos);
 	
 	worldIn.playSound(null, pos, SoundEvents.ENTITY_ENDERMEN_TELEPORT, SoundCategory.PLAYERS, 1.5F, 1.0F);
	
    
c. Methods will be called right after all the variables that are needed for the method are present.

    Ex.
    ItemStack stack = playerIn.getStackFromSlot(EntityEquipmentSlot.FEET);
    stack.damageItem(1, playerIn);
    
    Vec3d vector = playerIn.getLookVec().normalize();
    playerIn.motionX += vector.xCoord;
    playerIn.motionY += vector.yCoord;
    playerIn.motionZ += vector.zCoord;
     
d. Methods that are called without any prior variablle init. will be called first (or last or wherever necessary) in the block, grouped together.

    Ex.
    playerIn.playSound(SoundEvents.BLOCK_CLOTH_BREAK, 1.0F, 1.0F);
    stack.damageItem(1, playerIn);
    playerIn.motionY = 0.45D;
    
3. All parameters of methods that are overriden will have an "In" after their given name. Some special stereotyped parameter names that may refrain from following this rule in all cases are: EntityPlayer "playerIn", ItemStack "stack", World "worldIn".

    Ex.
    @Override
	public boolean hitEntity(ItemStack stack, EntityLivingBase targetIn, EntityLivingBase attackerIn)
	{
		if (attackerIn.isSneaking())
		{
			if (targetIn.hurtTime == targetIn.maxHurtTime && targetIn.deathTime <= 0)
			{
			    PotionEffect effect = targetIn.getActivePotionEffect(MobEffects.JUMP_BOOST);
			    
				if (effect != null) 
				{
					int amplifier = effect.getAmplifier();
					targetIn.motionY = (amplifier * 0.1125D) + 0.5625D;
				} 
				else 
				{
					targetIn.motionY = 0.475D;
				}
			}
		}
		
        return super.hitEntity(stack, targetIn, attackerIn);
	}