using {Personnel as per} from '../db/data-model';

service PersonnelManagement {
    entity Personnels as projection on per;
}
