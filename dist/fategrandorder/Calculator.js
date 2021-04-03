-- Calculator - Easily add arithmetic operations to wiki pages
-- Written by Shining-Armor
-- Version 0.1
 
local p = {}
local userError = require('Dev:User error')
local entrypoint = require('Dev:Entrypoint')
 
local function empty( s )
    if s == nil or s == '' then 
        return true
    else
        return false
    end
end
 
function p.addition( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for addition')
    else
        return tonumber( frame.args[1] ) + tonumber( frame.args[2] )
    end
end
 
function p.division( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for division')
    else 
        return tonumber( frame.args[1] ) / tonumber( frame.args[2] )
    end
end
 
function p.modulo( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for modulo')
    else
        return tonumber( frame.args[1] ) % tonumber( frame.args[2] )
    end
end
 
function p.multiplication( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for multiplication')
    else
        return tonumber( frame.args[1] ) * tonumber( frame.args[2] )
    end
end
 
function p.subtraction( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for subtraction')
    else
        return tonumber( frame.args[1] ) - tonumber( frame.args[2] )
    end
end
 
function p.exponentation( frame )
    if empty( frame.args[1] ) or empty( frame.args[2] ) then
        return userError('must provide 2 operands for exponentation')
    else
        return tonumber( frame.args[1] ) ^ tonumber( frame.args[2] )
    end
end
 
p.main = entrypoint(p)
 
return p