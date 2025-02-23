import { IsString} from "class-validator";

export class NewPasswordDto {

@IsString()
readonly  newPassword: string
}