using AutoMapper;
using Core.Models.Account;
using Core.Models.Seeder;
using Domain.Entities.Identity;

namespace Core.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));

        //CreateMap<AccountRegistrationModel, UserEntity>()
        //    .ForMember(opt => opt.Image, opt => opt.Ignore())
        //    .ForMember(opt => opt.Email, opt => opt.MapFrom(x => x.Email))
        //    .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));
        // moved to AccountMapper.cs
    }
}