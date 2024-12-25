struct Property {
    let name: String
    let safeName: String
    let type: PropertyType
    let required: Bool

    enum ValueType: String, CaseIterable {
        case string, int

        var asSwift: String {
            switch self {
            case .int:
                return "Int"
            case .string:
                return "String"
            }
        }
    }

    enum PropertyType {
        case string
        case int
        case dict
        case array(ValueType)
        case enumeration(name: String, options: [String])

        var swiftEnumeration: String? {
            if case let .enumeration(_, options) = self {
                return """
enum \(swiftType) {
\(options.map { "\t\t\tcase \($0)" }.joined(separator: "\n"))
\t\t}
"""
            }

            return nil
        }

        var swiftType: String {
            switch self {
            case .array(let type):
                return "[\(type.asSwift)]"
            case .int:
                return "Int"
            case .dict:
                return "[String: Any]"
            case .string:
                return "String"
            case .enumeration(let name, _):
                return name.capitalized
            }
        }

        var jsType: String {
            switch self {
            case .array:
                return "Array"
            case .int:
                return "Number"
            case .dict:
                return "Object"
            case .string:
                return "String"
            case .enumeration:
                return "Enum"
            }
        }
    }

    var asSwift: String {
        var output = ""
        if let swiftEnumeration = type.swiftEnumeration {
            output.append("\(swiftEnumeration)\n\t\t")
        }
        output.append("let \(safeName): \(type.swiftType)\(required ? "" : "?")")
        return output
    }

    var asJavascript: String {
        var jsOutput = "{\n"
        jsOutput.append("\t\tname: \"\(name)\",\n")
        jsOutput.append("\t\ttype: \"\(type.jsType)\",\n")
        jsOutput.append("\t\trequired: \(required),\n")

        if case let .enumeration(_, options) = type {
            let optionsString = options.map { "\"\($0)\"" }.joined(separator: ", ")
            jsOutput.append("\t\toptions: [\(optionsString)]\n")
        }

        jsOutput.append("}")
        return jsOutput
    }

    init(name: String, yaml: Any) {
        self.name = name
        self.safeName = name.replacingOccurrences(of: "$", with: "").lowerCamelCased()

        if let dict = yaml as? [String: Any] {
            guard let typeString = dict["type"] as? String else {
                fatalError("Type is required to be type of string, int, array for dictionary property types")
            }

            switch typeString {
            case "string":
                self.type = .string
            case "int":
                self.type = .int
            case "dict":
                self.type = .dict
            case "array":
                guard let valueTypeString = dict["valueType"] as? String,
                      let valueType = ValueType(rawValue: valueTypeString) else {
                    fatalError("ValueType is required to be type of \(ValueType.allCases) for dictionary property types")
                }
                self.type = .array(valueType)
            default:
                fatalError("Invalid type")
            }

            self.required = dict["required"] as? Bool ?? false
        } else if let array = yaml as? [String] {
            self.required = true
            self.type = .enumeration(name: name, options: array)
        } else {
            fatalError("Invalid property")
        }
    }
}
