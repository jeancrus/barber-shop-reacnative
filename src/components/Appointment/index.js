import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Container, Left, Avatar, Name, Info, Time } from './styles';

export default function Appointment({ data, onCancel }) {
    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.date), new Date(), {
            locale: ptBR,
            addSuffix: true,
        });
    }, [data.date]);

    return (
        <Container past={data.past}>
            <Left>
                <Avatar
                    source={{
                        uri: data.provider.avatar
                            ? data.provider.avatar.url_mobile
                            : `https://api.adorable.io/avatar/50/${data.provider.name}`,
                    }}
                />
                <Info>
                    <Name>{data.provider.name}</Name>
                    <Time>{dateParsed}</Time>
                </Info>
            </Left>

            {data.cancelable && !data.canceled_at && (
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={20} color="#f64c75" />
                </TouchableOpacity>
            )}
        </Container>
    );
}

Appointment.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string,
        past: PropTypes.bool,
        provider: PropTypes.shape({
            avatar: PropTypes.shape({
                url_mobile: PropTypes.string,
            }),
            name: PropTypes.string,
        }),
        cancelable: PropTypes.bool,
        canceled_at: PropTypes.string,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
};
