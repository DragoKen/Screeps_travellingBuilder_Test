module.exports = function ()
{
    StructureSpawn.prototype.createCustomHaulerCreep =
        function (energy, roleName)
        {
            var numberOfParts = Math.floor(energy / 100);
            var body = [];


            for (let i = 0; i < numberOfParts; i++)
            {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++)
            {
                body.push(MOVE);
            }

            return this.createCreep(body, undefined,{role: roleName, working: false});

        };
};