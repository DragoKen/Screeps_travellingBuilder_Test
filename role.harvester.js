module.exports = {
    run:function (creep) {

        //Memory
        var destination = creep.memory.assignedFlag;

        if (Game.flags[destination].memory.beingMined == false )
        {
            Game.flags[destination].memory.beingMined = true;
        }


        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false && creep.room.name !== Game.flags[destination].room.name)
        {
            creep.moveTo(destination);
        }
        else if (creep.memory.working == true) {
            var container= creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) =>     s.structureType ==STRUCTURE_CONTAINER
                                && s.energy < s.energyCapacity
            });
            if (container != undefined && creep.pos.getRangeTo(container) <= 1 )
            {
                creep.transfer(container, RESOURCE_ENERGY);
            }
            else
            {
                creep.drop(RESOURCE_ENERGY);
            }
        }

        else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags[destination]);
            }
        }
    }
};