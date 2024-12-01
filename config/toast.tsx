import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { theme } from '@/constants/theme';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.personality.respectful }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontFamily: 'Poppins_400Medium',
        color:
          props.type === 'success'
            ? theme.colors.success.default
            : props.type === 'info'
              ? theme.colors.info.dark
              : theme.colors.error.dark,
      }}
      renderLeadingIcon={() =>
        props.type === 'success' ? (
          <View style={{ marginLeft: 15, justifyContent: 'center' }}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success.default} />
          </View>
        ) : props.type === 'error' ? (
          <View style={{ marginLeft: 15, justifyContent: 'center' }}>
            <Ionicons name="close-circle" size={24} color={theme.colors.error.dark} />
          </View>
        ) : (
          <View style={{ marginLeft: 15, justifyContent: 'center' }}>
            <Ionicons name="information-circle" size={24} color={theme.colors.info.dark} />
          </View>
        )
      }
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: theme.colors.error.dark }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Poppins_400Regular',
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.secondary.dark }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Poppins_400Regular',
      }}
    />
  ),
};
