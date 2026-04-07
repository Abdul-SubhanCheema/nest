import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import { ActiveUserData } from "../Interfaces/activeuser.interface-data";
import { PAYLOAD_KEY } from "../constants/authtype.constant";

export const ActiveUser =createParamDecorator((data:keyof ActiveUserData | undefined, ctx:ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[PAYLOAD_KEY];
    return data ? user?.[data] : user;
})