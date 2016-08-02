module.exports = function ()
{
    StructureSpawn.prototype.createCustomHarvesterCreep =
        function (flagName, roleName)
        {

            var body = [];

            for (let i = 0; i < 5; i++)
            {
                body.push(WORK);
            }
            body.push(CARRY);
            body.push(MOVE);

            return this.createCreep(body, undefined,{role: roleName, working: false, assignedFlag: flagName});

        };
};