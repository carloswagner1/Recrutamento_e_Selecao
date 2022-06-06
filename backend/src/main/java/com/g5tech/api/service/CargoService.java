package com.g5tech.api.service;

import com.g5tech.api.exception.CargoNotFoundException;
import com.g5tech.api.model.Cargo;
import com.g5tech.api.model.Departamento;
import com.g5tech.api.repository.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CargoService {

    private final CargoRepository cargoRepository;

    public List<Cargo> getByDepartamento(Departamento departamento) {
        return cargoRepository.findAllByDepartamento(departamento);
    }

    public Cargo getCargoByNameAndDepartamento(String cargo, Departamento departamento) {

        Optional<Cargo> cargoOptional = cargoRepository.findByNomeAndDepartamento(cargo, departamento);

        if (!cargoOptional.isPresent()) {
            throw new CargoNotFoundException();
        }

        return cargoOptional.get();
    }

    public Cargo getByName(String nomeCargo, Departamento departamento) {

        Optional<Cargo> cargoOptional = cargoRepository.findByNomeAndDepartamento(nomeCargo, departamento);

        if (!cargoOptional.isPresent()) {
            throw  new CargoNotFoundException();
        }

        return cargoOptional.get();
    }
}
