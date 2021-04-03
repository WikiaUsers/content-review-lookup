                   https://trello.com/b/vy0WufMh/dinocraft-list

1 / 2000 (0.05%) = Tuskerers Charm                  < 1
2 / 2000 (0.10%) = Blevent Ingot                    < 3
3 / 2000 (0.15%) = Ranium                           < 6
4 / 2000 (0.20%) = Chlorophyte Ingot                < 10
4 / 2000 (0.20%) = Sheeplite Ingot                  < 14
5 / 2000 (0.20%) = Magic Leaf                       < 18
6 / 2000 (0.25%) = Flobber Ingot                    < 23
7 / 2000 (0.25%) = Gold Nugget (1 - 16)             < 28
8 / 2000 (0.25%) = Tuskerers Gem                    < 34
9 / 2000 (0.40%) = Leather (1 - 4)                  < 42
10 / 2000 (0.45%) = Bonemeal (1 - 9)                < 52
50 / 2000 (0.50%) = Poisonous Potato                < 62
50 / 2000
100 / 2000
100 / 2000 (2.00%) = Chunky Flesh                   < 140
100 / 2000 (3.00%) = Tusk /*Cobweb (1 - 3), String (1 - 4), Spawn Cloud Particles, Spawn Spiders (1 - 2)*/                  < 200
200 / 2000 (5.00%) = Stick                          < 300
200 / 2000 (9.00%) = Clay (1 - 4)                   < 480
300 / 2000 (13.00%) = Cobblestone (1 - 3)           < 740
300 / 2000 (17.00%) = Cracked Pebbles (1 - 3)       < 1080
300 / 2000 (21.00%) = Pebbles (1 - 3)               < 1500
300 / 2000 (25.00%) = Bone                          < 2000

























































    @Override
    public Item getItemDropped(IBlockState state, Random rand, int fortune) 
    {
        int i = rand.nextInt(2000);
        this.amount = 1;
        
        if (i < 1) // 1 / 2000 = 0.05%
        {
            return DinocraftItems.TUSKERERS_CHARM;
        } 
        else if (i < 10) // 9 / 2000 = 0.45%
        {
            return DinocraftItems.BLEVENT_INGOT;
        }
        else if (i < 13) // 3 / 2000 = 0.2%
        {
            return DinocraftArmor.UMBRELLA_HAT;
        } 
        else if (i < 17) // 4 / 2000 = 0.2%
        {
            return DinocraftItems.LEAF;
        } 
        else if (i < 22) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.RANIUM;
        } 
        else if (i < 28) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.SHEEPLITE_INGOT;
        } 
        else if (i < 33) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.CHLOROPHYTE_INGOT;
        } 
        else if (i < 39) // 6 / 2000 = 0.30%
        {
            return DinocraftItems.TUSKERERS_GEM;
        } 
        else if (i < 46) // 7 / 2000 = 0.35%
        {
        	this.amount = rand.nextInt(16) + 1;
            return Items.GOLD_NUGGET;
        }
        else if (i < 53) // 7 / 2000 = 0.35%
        {
            return DinocraftItems.FLOBBER_INGOT;
        }
        else if (i < 61) // 8 / 2000 = 0.4%
        {
        	this.amount = rand.nextInt(4) + 1;
        	return Items.LEATHER;
        } 
        else if (i < 70) // 9 / 2000 = 0.45%
        {
            return this.amount = rand.nextInt(10) + 1;
            return Items.IRON_NUGGET;
        } 
        else if (i < 80) // 10 / 2000 = 0.5%
        {
            return Items.POISONOUS_POTATO;
        }
        else if (i < 100) // 20 / 2000 = 1%
        {
            return DinocraftItems.TUSK;
        }
        else if (i < 140) // 40 / 2000 = 2%
        {
        	this.amount = rand.nextInt(2) + 1;
            return DinocraftItems.CHUNKY_FLESH;
        }
        else if (i < 200) // 60 / 2000 = 3%
        {
            return null /* WIP */;
        }
        else if (i < 300) // 100 / 2000 = 5%
        {
            return Items.STICK;
        }
        else if (i < 480) // 180 / 2000 = 9%
        {
        	this.amount = rand.nextInt(4) + 1;
            return Items.CLAY_BALL;
        }
        else if (i < 740) // 260 / 2000 = 13%
        {
        	this.amount = rand.nextInt(3) + 1;
            return Item.getItemFromBlock(Blocks.COBBLESTONE);
        }
        else if (i < 1080) // 340 / 2000 = 17%
        {
        	this.amount = rand.nextInt(3) + 1;
            return DinocraftItems.CRACKED_PEBBLES;
        }
        else if (i < 1500) // 420 / 2000 = 21%
        {
        	this.amount = rand.nextInt(3) + 1;
            return DinocraftItems.PEBBLES;
        }
        else if (i < 2000) // 500 / 2000 = 25%
        {
            return Items.BONE;
        }

        return null;
    }







































    @Override
    public Item getItemDropped(IBlockState state, Random rand, int fortune) 
    {
        int i = rand.nextInt(2000);
        this.amount = 1;
        
        if (i < 1) // 1 / 2000 = 0.05%
        {
            return DinocraftItems.TUSKERERS_CHARM;
        } 
        else if (i < 10) // 9 / 2000 = 0.45%
        {
            return DinocraftItems.BLEVENT_INGOT;
        }
        else if (i < 13) // 3 / 2000 = 0.2%
        {
            return DinocraftArmor.UMBRELLA_HAT;
        } 
        else if (i < 17) // 4 / 2000 = 0.2%
        {
            return DinocraftItems.LEAF;
        } 
        else if (i < 22) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.RANIUM;
        } 
        else if (i < 28) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.SHEEPLITE_INGOT;
        } 
        else if (i < 33) // 5 / 2000 = 0.25%
        {
            return DinocraftItems.CHLOROPHYTE_INGOT;
        } 
        else if (i < 39) // 6 / 2000 = 0.30%
        {
            return DinocraftItems.TUSKERERS_GEM;
        } 
        else if (i < 46) // 7 / 2000 = 0.35%
        {
        	this.amount = rand.nextInt(16) + 1;
            return Items.GOLD_NUGGET;
        }
        else if (i < 53) // 7 / 2000 = 0.35%
        {
            return DinocraftItems.FLOBBER_INGOT;
        }
        else if (i < 61) // 8 / 2000 = 0.4%
        {
        	this.amount = rand.nextInt(4) + 1;
        	return Items.LEATHER;
        } 
        else if (i < 80) // 19 / 2000 = 0.95%
        {
            return Items.POISONOUS_POTATO;
        }
        else if (i < 100) // 20 / 2000 = 1%
        {
            return this.amount = rand.nextInt(10) + 1;
            return Items.IRON_NUGGET;
        }
        else if (i < 140) // 40 / 2000 = 2%
        {
        	this.amount = rand.nextInt(2) + 1;
            return DinocraftItems.CHUNKY_FLESH;
        }
        else if (i < 300) // 160 / 2000 = 8%
        {
            return Items.STICK;
        }
        else if (i < 480) // 180 / 2000 = 9%
        {
        	this.amount = rand.nextInt(4) + 1;
            return Items.CLAY_BALL;
        }
        else if (i < 740) // 260 / 2000 = 13%
        {
        	this.amount = rand.nextInt(3) + 1;
            return Item.getItemFromBlock(Blocks.COBBLESTONE);
        }
        else if (i < 1080) // 340 / 2000 = 17%
        {
        	this.amount = rand.nextInt(3) + 1;
            return DinocraftItems.CRACKED_PEBBLES;
        }
        else if (i < 1500) // 420 / 2000 = 21%
        {
        	this.amount = rand.nextInt(3) + 1;
            return DinocraftItems.PEBBLES;
        }
        else if (i < 2000) // 500 / 2000 = 25%
        {
            return Items.BONE;
        }

        return null;
    }