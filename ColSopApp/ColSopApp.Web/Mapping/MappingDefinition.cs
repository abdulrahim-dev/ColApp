using System;
using System.Globalization;
using System.Linq;
using AutoMapper;
using ColSopApp.Core.Entities.Foundation;
using ColSopApp.Web.References;

namespace ColSopApp.Web.Mapping
{
    public class MappingDefinitions
    {
        public void Initialise()
        {
            _autoRegistrations();
        }

        private void _autoRegistrations()
        {
            var dataEntities =
                ReferencedAssemblies.Domain.
                    GetTypes().Where(x => typeof(IEntity).IsAssignableFrom(x)).ToList();

            var dtos =
                ReferencedAssemblies.Dto.
                GetTypes().Where(x => x.Name.EndsWith("Dto", true, CultureInfo.InvariantCulture)).ToList();

            foreach (var entity in dataEntities)
            {
                if (Mapper.Configuration.GetAllTypeMaps().FirstOrDefault(m => m.DestinationType == entity || m.SourceType == entity) == null)
                {
                    var matchingDto =
                        dtos.FirstOrDefault(x => x.Name.Replace("Dto", string.Empty).Equals(entity.Name, StringComparison.InvariantCultureIgnoreCase));

                    if (matchingDto != null)
                    {
                        Mapper.Initialize(cfg => {
                            cfg.CreateMap(entity, matchingDto);
                        });
                        Mapper.Initialize(cfg => {
                            cfg.CreateMap(matchingDto, entity);
                        });
                    }
                }
            }

        }

    }
}