using AutoMapper;
using Core.Models.Auth;
using Core.Models.Seeder;
using Domain.Entities.Identity;

namespace Core.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));

        CreateMap<AuthRegistrationModel, UserEntity>()
            .ForMember(opt => opt.Image, opt => opt.Ignore())
            .ForMember(opt => opt.Email, opt => opt.MapFrom(x => x.Email))
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));
    }
}